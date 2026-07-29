document.getElementById("calcular").addEventListener("click", calcular);

function calcular() {

    // Obtener datos del formulario
    let potencia = Number(document.getElementById("potencia").value);
    let tension = Number(document.getElementById("tension").value);
    let cos = Number(document.getElementById("cos").value);
    let longitud = Number(document.getElementById("longitud").value);
    let factor_temp = Number(document.getElementById("temperatura").value);
    let factor_agru = Number(document.getElementById("agrupamiento").value);
    let cantidad_agru = factor_agru;
    let tierra = Number(document.getElementById("tierra").value);

    // Validaciones
    if (
        potencia <= 0 ||
        tension <= 0 ||
        cos <= 0 ||
        longitud <= 0 ||
        factor_temp <= 0 ||
        factor_agru <= 0
    ) {
        alert("Completa correctamente todos los datos.");
        return;
    }

    // Factor por temperatura
    if (factor_temp <= 10)
        factor_temp = 1.29;
    else if (factor_temp <= 15)
        factor_temp = 1.22;
    else if (factor_temp <= 20)
        factor_temp = 1.15;
    else if (factor_temp <= 25)
        factor_temp = 1.08;
    else if (factor_temp <= 30)
        factor_temp = 1;
    else if (factor_temp <= 35)
        factor_temp = 0.91;
    else if (factor_temp <= 40)
        factor_temp = 0.82;
    else
        factor_temp = 0.71;

    // Factor por agrupamiento
    if (factor_agru < 4)
        factor_agru = 1;
    else if (factor_agru <= 6)
        factor_agru = 0.8;
    else if (factor_agru <= 9)
        factor_agru = 0.7;
    else if (factor_agru <= 20)
        factor_agru = 0.5;
    else if (factor_agru <= 30)
        factor_agru = 0.45;
    else if (factor_agru <= 40)
        factor_agru = 0.4;
    else
        factor_agru = 0.35;

    // Operaciones principales
    let s = potencia / cos;
    let corriente_nominal = s / tension;
    let corriente_agrup = corriente_nominal / factor_agru;
    let corriente_temp = corriente_agrup / factor_temp;
    let caida_tension = ((4 * longitud * corriente_nominal) / (tension * 3));


    // Mostrar resultados parciales
    document.getElementById("s").textContent = s.toFixed(2) + " VA";
    document.getElementById("corrienteNominal").textContent = corriente_nominal.toFixed(2) + " A";
    document.getElementById("corrienteAgrup").textContent = corriente_agrup.toFixed(2) + " A";
    document.getElementById("corrienteTemp").textContent = corriente_temp.toFixed(2) + " A";
    document.getElementById("caidaTension").textContent = caida_tension.toFixed(2);

    // Cálculo del calibre por amperaje
    let calibre_ampe = "";
    let calibre_tensi = "";

    if (corriente_temp <= 15)
        calibre_ampe = "Cal. 14";
    else if (corriente_temp <= 20)
        calibre_ampe = "Cal. 12";
    else if (corriente_temp <= 30)
        calibre_ampe = "Cal. 10";
    else if (corriente_temp <= 40)
        calibre_ampe = "Cal. 8";
    else if (corriente_temp <= 55)
        calibre_ampe = "Cal. 6";
    else if (corriente_temp <= 70)
        calibre_ampe = "Cal. 4";
    else if (corriente_temp <= 85)
        calibre_ampe = "Cal. 3";
    else if (corriente_temp <= 95)
        calibre_ampe = "Cal. 2";
    else if (corriente_temp <= 110)
        calibre_ampe = "Cal. 1";
    else {
        alert("La corriente excede el límite máximo de 110 A.");
        return;
    }

    // Cálculo por caída de tensión

    if (caida_tension <= 2.08)
        calibre_tensi = "Cal. 14";
    else if (caida_tension <= 3.31)
        calibre_tensi = "Cal. 12";
    else if (caida_tension <= 5.26)
        calibre_tensi = "Cal. 10";
    else if (caida_tension <= 8.37)
        calibre_tensi = "Cal. 8";
    else if (caida_tension <= 13.3)
        calibre_tensi = "Cal. 6";
    else if (caida_tension <= 21.2)
        calibre_tensi = "Cal. 4";
    else if (caida_tension <= 33.6)
        calibre_tensi = "Cal. 2";
    else if (caida_tension <= 42.4)
        calibre_tensi = "Cal. 1";
    else {
        alert("La caída de tensión excede el rango permitido.");
        return;
    }

    // Decisión del calibre final

    const jerarquia = [ "Cal. 14", "Cal. 12", "Cal. 10", "Cal. 8", "Cal. 6", "Cal. 4", "Cal. 3", "Cal. 2", "Cal. 1" ];
    let indiceAmpe = jerarquia.indexOf(calibre_ampe);
    let indiceTension = jerarquia.indexOf(calibre_tensi);
    let decision_cali;

    if (indiceAmpe >= indiceTension)
        decision_cali = calibre_ampe;
    else
        decision_cali = calibre_tensi;

    // Mostrar resultados

    document.getElementById("calibreAmperaje").textContent = calibre_ampe;
    document.getElementById("calibreTension").textContent = calibre_tensi;

    // REGLA NOM-001-SEDE

    const nota = document.getElementById("notaNorma");
    const motorGrupo = document.getElementById("motorGrupo");

    nota.classList.add("oculto");
    motorGrupo.classList.add("oculto");

    if (decision_cali === "Cal. 14") {
        nota.classList.remove("oculto");
        motorGrupo.classList.remove("oculto");
        let motor = Number(document.getElementById("motor").value);
        if (motor === 1) {
            decision_cali = "Cal. 12";
        }
    }

    document.getElementById("calibreFinal").textContent = decision_cali;

    // Grosor del calibre seleccionado

    let grosor_calibre = 0;

    switch (decision_cali) {
        case "Cal. 14":
            grosor_calibre = 6.258;
            break;
        case "Cal. 12":
            grosor_calibre = 8.581;
            break;
        case "Cal. 10":
            grosor_calibre = 13.61;
            break;
        case "Cal. 8":
            grosor_calibre = 23.61;
            break;
        case "Cal. 6":
            grosor_calibre = 32.71;
            break;
        case "Cal. 4":
            grosor_calibre = 53.16;
            break;
        case "Cal. 3":
            grosor_calibre = 62.77;
            break;
        case "Cal. 2":
            grosor_calibre = 74.71;
            break;
        case "Cal. 1":
            grosor_calibre = 100.8;
            break;
    }

    // Calibre de tierra

    let decision_tierra = "No aplica";
    let grosor_tierra = 0;

    if (tierra === 1) {
        if (corriente_temp < 15) {
            decision_tierra = "Cal. 14";
            grosor_tierra = 2.08;
        }
        else if (corriente_temp >= 15 && corriente_temp < 20) {
            decision_tierra = "Cal. 12";
            grosor_tierra = 3.31;
        }
        else if (corriente_temp >= 21 && corriente_temp < 60) {
            decision_tierra = "Cal. 10";
            grosor_tierra = 5.26;
        }
        else if (corriente_temp >= 61 && corriente_temp <= 100) {
            decision_tierra = "Cal. 8";
            grosor_tierra = 8.37;
        }
    }

    // Grosor total

    let tuberia = (grosor_calibre * cantidad_agru) + grosor_tierra;

    // Tubería recomendada

    let decision_tube = "Mayor a 1 pulgada";

    if (tuberia < 81) {
        decision_tube = '1/2"';
    }
    else if (tuberia >= 82 && tuberia < 141) {
        decision_tube = '3/4"';
    }
    else if (tuberia >= 142 && tuberia < 229) {
        decision_tube = '1"';
    }

    // Mostrar resultados

    document.getElementById("calibreTierra").textContent = decision_tierra;
    document.getElementById("grosorTotal").textContent = tuberia.toFixed(2);
    document.getElementById("tuberia").textContent = decision_tube;

}