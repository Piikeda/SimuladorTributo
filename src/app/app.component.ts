import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  public VlProd = "";
  public nroNF = "000014181"
  //+ ", 000014182, 000014181, 000014183, 000014184, 000014181, 000014185, 0000141816, 0000141816, 0000141816, 0000141816, 0000141816"
  + ", 0000141816, 0000141816, 0000141816, 0000141816";//, 0000141816, 0000141816";
  public produto = "PJ080-19M - CJ  WEB BOX BL, 10004 - LENNY KRAVTIZ DO PARAGUAY"
  //+ ", PJ080-19M - CJ ECO WEB BOX BLE, PJ080-19M - CJ ECO WEB BOX BLEBALBALBLBALBABALB, PJ080-19M - CJ ECO WEB BOX BLE,PJ080-19M - CJ ECO WEB BOX BLE,"
  //+ " PJ080-19M - CJ ECO WEB BOX BLE, PJ080-19M - CJ ECO WEB BOX BLE, PJ080-19M - CJ ECO WEB BOX BLE,PJ080-19M - CJ ECO WEB BOX BLE, PJ080-19M - CJ ECO WEB BOX BLE";
  public tipo = "";
  public dataIni = "30/12/2023";
  public dataFim = "30/12/2023";
  public esfera = "FEDERAL, ESTADUAL, MUNICIPAL";
  public cfop = "1102 – Compra para comercialização"
  //+ ", 2102 – Compra para comercialização, 2403 – Compra para comercialização em operação com mercadoria sujeita ao regime de substituição tributária, 2403 – Compra para comercialização em operação com mercadoria sujeita ao regime de substituição tributária, 2403 – Compra para comercialização em operação com mercadoria sujeita ao regime de substituição tributária"
  //+ " 2403 – Compra para comercialização em operação com mercadoria sujeita ao regime de substituição tributária, 2403 – Compra para comercialização em operação com mercadoria sujeita ao regime de substituição tributária";
  public sEmp = "EMP. INDUSTRIA E DISTRIBUICAO S.A";
  public sEtb = "EMP. INDUSTRIA E DISTRIBUICAO S.A";
  public sMovto = "SAIDA";
  public alerts: any[] = [];
  public dadosPrd: any[] = [];
  title = 'Simulador de Tributo';
  ngOnInit(): void {
    this.getProdSimulation(this.nroNF, this.produto, this.esfera, this.VlProd, this.tipo, this.dataIni, this.dataFim);
  }
  public async getProdSimulation(nroNf: string, produto: string, esfera: string, vlrProd: string, tipo: string, dtIni: string, dtFim: string) {
    alert("this.getProdSimulation");
    let sEsfera = esfera;
    let vlr_base = "0";
    let vlr_aliq_pis = "0";
    let vlr_aliq_cofins = "0";
    let vlr_aliq_iss = "0";
    let vlr_aliq_icms = "0";
    let vlr_aliq_ipi = "0";
    let vlr_aliq_icms_st = "0";
    let sTribReg = "";
    let sTotalAliq = "0";
    
    (document.getElementById("lblEmpresa") as HTMLSelectElement).innerText = this.sEmp;
    (document.getElementById("lblEstabelecimento") as HTMLSelectElement).innerText = this.sEtb;
    (document.getElementById("lblEsfera") as HTMLSelectElement).innerText = this.esfera;
    (document.getElementById("lblMovimento") as HTMLSelectElement).innerText = this.sMovto;
    (document.getElementById("lblDataIni") as HTMLSelectElement).innerText = this.dataIni + " ATÉ: " + this.dataFim;
    /*(document.getElementById("rowSpaceNrNF") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrNF1") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrNF2") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrNF4") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrPrd") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrPrd1") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrPrd2") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrPrd3") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrPrd4") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrPrd5") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrPrd6") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrCfop") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrCfop1") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrCfop2") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrCfop3") as HTMLSelectElement).hidden = true;
    (document.getElementById("rowSpaceNrCfop4") as HTMLSelectElement).hidden = true;*/
    let nCountPrdLen = 0;
    let sPrd = "";
    let sCfop = "";
    let sNrNf = "";
    this.produto.toString().split(",").forEach((itemPrd) => {
      nCountPrdLen = nCountPrdLen + itemPrd.length;
      if (sPrd === "") {
        sPrd = itemPrd;
      } else {
        sPrd = sPrd + itemPrd;
      }
    });
    let nCountCFOPLen = 0;
    this.cfop.toString().split(",").forEach((itemCFOP) => {
      nCountCFOPLen = nCountCFOPLen + itemCFOP.length;
      if (sCfop === "") {
        sCfop = itemCFOP;
      } else {
        sCfop = sCfop + itemCFOP;
      }
    });
    let nCountNroLen = 0;
    this.nroNF.toString().split(",").forEach((itemNrNF) => {
      nCountNroLen = nCountNroLen + itemNrNF.length;
      if (sNrNf === "") {
        sNrNf = itemNrNF;
      } else {
        sNrNf = sNrNf + itemNrNF;
      }
    });
    (document.getElementById("lblNroNf") as HTMLSelectElement).innerText = sNrNf.slice(0, 200);
    (document.getElementById("lblProduto") as HTMLSelectElement).innerText = sPrd.slice(0, 400);
    (document.getElementById("lblCFOPs") as HTMLSelectElement).innerText = sCfop.slice(0, 400);
    /*
    if (nCountNroLen > 50) {
      (document.getElementById("rowSpaceNrNF") as HTMLSelectElement).hidden = false;
      if (nCountNroLen > 120) {
        (document.getElementById("rowSpaceNrNF1") as HTMLSelectElement).hidden = false;
      }
      if (nCountNroLen > 140) {
        (document.getElementById("rowSpaceNrNF2") as HTMLSelectElement).hidden = false;
      }
      (document.getElementById("rowSpaceNrNF4") as HTMLSelectElement).hidden = false;
    }
    if (nCountPrdLen > 60) {
      (document.getElementById("rowSpaceNrPrd") as HTMLSelectElement).hidden = false;
      if (nCountPrdLen > 120) {
        (document.getElementById("rowSpaceNrPrd1") as HTMLSelectElement).hidden = false;
      }
      if (nCountPrdLen > 200) {
        (document.getElementById("rowSpaceNrPrd2") as HTMLSelectElement).hidden = false;
      }
      if (nCountPrdLen > 240) {
        (document.getElementById("rowSpaceNrPrd3") as HTMLSelectElement).hidden = false;
      }
      if (nCountPrdLen > 260) {
        (document.getElementById("rowSpaceNrPrd4") as HTMLSelectElement).hidden = false;
      }
      if (nCountPrdLen > 300) {
        (document.getElementById("rowSpaceNrPrd5") as HTMLSelectElement).hidden = false;
      }
      (document.getElementById("rowSpaceNrPrd6") as HTMLSelectElement).hidden = false;
    }
    if (nCountCFOPLen > 90) {
      (document.getElementById("rowSpaceNrCfop") as HTMLSelectElement).hidden = false;
      if (nCountCFOPLen > 160) {
        (document.getElementById("rowSpaceNrCfop1") as HTMLSelectElement).hidden = false;
      }
      if (nCountCFOPLen > 200) {
        (document.getElementById("rowSpaceNrCfop2") as HTMLSelectElement).hidden = false;
      }
      if (nCountCFOPLen > 240) {
        (document.getElementById("rowSpaceNrCfop3") as HTMLSelectElement).hidden = false;
      }
        */
      this.MockProdNF();
      ({ vlr_base, vlr_aliq_pis, vlr_aliq_cofins, vlr_aliq_iss, vlr_aliq_icms, vlr_aliq_ipi, vlr_aliq_icms_st, sTribReg, sTotalAliq } = this.atualizaTelaCompleta(vlr_base, vlr_aliq_pis, vlr_aliq_cofins, vlr_aliq_iss, vlr_aliq_icms, vlr_aliq_ipi, vlr_aliq_icms_st, sEsfera, sTribReg, sTotalAliq));
      if (vlr_base === "0") {
        (document.getElementById("vlUnitario") as HTMLSelectElement).value = String(Number(vlrProd).toFixed(2));
        (document.getElementById("vlTotalBaseCalcCompleto") as HTMLSelectElement).innerText = String(Number(vlrProd).toFixed(2));
      }
      
    
  }
  public atualizaTelaCompleta(vlr_base: string, vlr_aliq_pis: string, vlr_aliq_cofins: string, vlr_aliq_iss: string, vlr_aliq_icms: string, vlr_aliq_ipi: string, vlr_aliq_icms_st: string, sEsfera: string, sTribReg: string, sTotalAliq: string) {
    let vlr_base_arr = new Array();
    let vlr_aliq_pis_arr = new Array();
    let vlr_aliq_cofins_arr = new Array();
    let vlr_aliq_iss_arr = new Array();
    let vlr_aliq_icms_arr = new Array();
    let vlr_aliq_ipi_arr = new Array();
    let vlr_aliq_icms_st_arr = new Array();
    let vlr_trib = 0;
    let vlr_trib_ibs = 0;
    let vlr_trib_cbs = 0;
    let descprd = "";
    let nAliqIBS = 0;
    let nAliqCBS = 0;
    this.dadosPrd.forEach((item) => {
      if (descprd !== item.cod_produto_servico) {
        descprd = item.cod_produto_servico;
        vlr_base = String(Number(vlr_base) + Number(item.vlr_item_merc));
      }
      if (item.aliq_icms !== 0) {
        vlr_aliq_icms = item.aliq_icms;
        vlr_aliq_icms_arr.push(vlr_aliq_icms);
        if (item.vlr_trib !== 0) {
          vlr_trib_ibs = Number(vlr_trib_ibs) + Number(item.vlr_trib);
        }
      }
      if (item.aliq_iss !== 0) {
        vlr_aliq_iss = item.aliq_iss;
        vlr_aliq_iss_arr.push(vlr_aliq_iss);
        if (item.vlr_trib !== 0) {
          vlr_trib_ibs = Number(vlr_trib_ibs) + Number(item.vlr_trib);
        }
      }
      if (item.aliq_icms_st !== 0) {
        vlr_aliq_icms_st = item.aliq_icms_st;
        vlr_aliq_icms_st_arr.push(vlr_aliq_icms_st);
        if (item.vlr_trib !== 0) {
          vlr_trib_ibs = Number(vlr_trib_ibs) + Number(item.vlr_trib);
        }
      }
      if (item.aliq_pis !== 0) {
        vlr_aliq_pis = item.aliq_pis;
        vlr_aliq_pis_arr.push(vlr_aliq_pis);
        if (item.vlr_trib !== 0) {
          vlr_trib_cbs = Number(vlr_trib_cbs) + Number(item.vlr_trib);
        }
      }
      if (item.aliq_cofins !== 0) {
        vlr_aliq_cofins = item.aliq_cofins;
        vlr_aliq_cofins_arr.push(vlr_aliq_cofins);
        if (item.vlr_trib !== 0) {
          vlr_trib_cbs = Number(vlr_trib_cbs) + Number(item.vlr_trib);
        }
      }
      if (item.aliq_ipi !== 0) {
        vlr_aliq_ipi = item.aliq_ipi;
        vlr_aliq_ipi_arr.push(vlr_aliq_ipi);
        if (item.vlr_trib !== 0) {
          vlr_trib_cbs = Number(vlr_trib_cbs) + Number(item.vlr_trib);
        }
      }
      if (item.vlr_trib !== 0) {
        vlr_trib = Number(vlr_trib) + Number(item.vlr_trib);
      }
    });
    const vlr_base_median = this.median(vlr_base_arr);
    if (!isNaN(vlr_base_median)) {
      vlr_base = vlr_base_median.toFixed(2).toString();
    }
    const vlr_aliq_pis_median = this.median(vlr_aliq_pis_arr);
    if (!isNaN(vlr_aliq_pis_median)) {
      vlr_aliq_pis = vlr_aliq_pis_median.toFixed(2).toString();
    }
    const vlr_aliq_cofins_median = this.median(vlr_aliq_cofins_arr);
    if (!isNaN(vlr_aliq_cofins_median)) {
      vlr_aliq_cofins = vlr_aliq_cofins_median.toFixed(2).toString();
    }
    const vlr_aliq_iss_median = this.median(vlr_aliq_iss_arr);
    if (!isNaN(vlr_aliq_iss_median)) {
      vlr_aliq_iss = vlr_aliq_iss_median.toFixed(2).toString();
    }
    const vlr_aliq_icms_median = this.median(vlr_aliq_icms_arr);
    if (!isNaN(vlr_aliq_icms_median)) {
      vlr_aliq_icms = vlr_aliq_icms_median.toFixed(2).toString();
    }
    const vlr_aliq_icms_st_median = this.median(vlr_aliq_icms_st_arr);
    if (!isNaN(vlr_aliq_icms_st_median)) {
      vlr_aliq_icms_st = vlr_aliq_icms_st_median.toFixed(2).toString();
    }
    const vlr_aliq_ipi_median = this.median(vlr_aliq_ipi_arr);
    if (!isNaN(vlr_aliq_ipi_median)) {
      vlr_aliq_ipi = vlr_aliq_ipi_median.toFixed(2).toString();
    }
    (document.getElementById("vlTribCompletoIBS") as HTMLSelectElement).innerText = "R$" + String(vlr_trib_ibs.toFixed(2)).replace(".", ",");
    (document.getElementById("vlTribCompletoCBS") as HTMLSelectElement).innerText = "R$" + String(vlr_trib_cbs.toFixed(2)).replace(".", ",");
    (document.getElementById("vlImpostoAtualIBS") as HTMLSelectElement).innerText = "R$" + String(vlr_trib_ibs.toFixed(2)).replace(".", ",");
    (document.getElementById("vlImpostoAtualCBS") as HTMLSelectElement).innerText = "R$" + String(vlr_trib_cbs.toFixed(2)).replace(".", ",");
    (document.getElementById("vlSimPrd") as HTMLSelectElement).value = String(Number(vlr_base).toFixed(2)).replace(".", ",");
    (document.getElementById("vlSimPrd2") as HTMLSelectElement).value = String(Number(vlr_base).toFixed(2)).replace(".", ",");
    (document.getElementById("vlImpAtual") as HTMLSelectElement).innerText = "R$" + String(vlr_trib.toFixed(2)).replace(".", ",");
    (document.getElementById("vlTribCompleto") as HTMLSelectElement).innerText = "R$" + String(vlr_trib.toFixed(2)).replace(".", ",");
    (document.getElementById("vlTotalBaseCalcCompleto") as HTMLSelectElement).innerText = "R$" + String(Number(vlr_base).toFixed(2)).replace(".", ",");
    (document.getElementById("vlrAliqPisCompleto") as HTMLSelectElement).innerText = vlr_aliq_pis + "%";
    (document.getElementById("vlrAliqCofinsCompleto") as HTMLSelectElement).innerText = vlr_aliq_cofins + "%";
    (document.getElementById("vlrAliqISSCompleto") as HTMLSelectElement).innerText = vlr_aliq_iss + "%";
    (document.getElementById("vlrAliqIPICompleto") as HTMLSelectElement).innerText = vlr_aliq_ipi + "%";
    (document.getElementById("vlrAliqICMSCompleto") as HTMLSelectElement).innerText = vlr_aliq_icms + "%";
    (document.getElementById("vlrAliqICMSSTCompleto") as HTMLSelectElement).innerText = vlr_aliq_icms_st + "%";
    if (sEsfera.indexOf("'Federal'")) {
      sTribReg = " CBS (Federal)";
      (document.getElementById("divAliqPIS") as HTMLSelectElement).hidden = false;
      (document.getElementById("divAliqCofins") as HTMLSelectElement).hidden = false;
      (document.getElementById("divAliqIPI") as HTMLSelectElement).hidden = false;
      sTotalAliq = String(Number(sTotalAliq) + Number(vlr_aliq_pis) + Number(vlr_aliq_cofins) + Number(vlr_aliq_ipi));
      nAliqCBS = Number(nAliqCBS) + Number(vlr_aliq_pis) + Number(vlr_aliq_cofins) + Number(vlr_aliq_ipi);
    }
    if (sEsfera.indexOf("'Estadual'")) {

      sTribReg = sTribReg + " IBS (Estadual)";
      (document.getElementById("divAliqICMS") as HTMLSelectElement).hidden = false;
      (document.getElementById("divAliqICMSST") as HTMLSelectElement).hidden = false;
      sTotalAliq = String(Number(sTotalAliq) + Number(vlr_aliq_icms) + Number(vlr_aliq_icms_st));
      nAliqIBS = Number(nAliqIBS) + Number(vlr_aliq_icms) + Number(vlr_aliq_icms_st);
    }
    if (sEsfera.indexOf("'Municipal'")) {

      if (!sEsfera.indexOf("IBS")) {
        sTribReg = sTribReg + " IBS (Municipal)";
      } else {
        sTribReg = sTribReg + " (Municipal)";
      }

      (document.getElementById("divAliqISS") as HTMLSelectElement).hidden = false;
      sTotalAliq = String(Number(sTotalAliq) + Number(vlr_aliq_iss));
      nAliqIBS = Number(nAliqIBS) + Number(vlr_aliq_iss);
    }
    (document.getElementById("vlTotalAliqIBS") as HTMLSelectElement).innerText = Number(nAliqIBS).toFixed(2) + "%";
    (document.getElementById("vlTotalAliqCBS") as HTMLSelectElement).innerText = Number(nAliqCBS).toFixed(2) + "%";
    (document.getElementById("vlTotalAliqCompleto") as HTMLSelectElement).innerText = Number(sTotalAliq).toFixed(2) + "%";
    (document.getElementById("vlrAliqTotalAtual") as HTMLSelectElement).innerText = Number(sTotalAliq).toFixed(2) + "%";

    return { vlr_base, vlr_aliq_pis, vlr_aliq_cofins, vlr_aliq_iss, vlr_aliq_icms, vlr_aliq_ipi, vlr_aliq_icms_st, sTribReg, sTotalAliq };
  }
  public async MockProdNF() {
    this.dadosPrd =
      [
        {
          cod_produto_servico: "PJ080-19M - CJ ECO BAGOS BLE",
          razao_social_estab: "EMP INDUSTRIA E DISTRIBUICAO S.A",
          vlr_item_merc: 202,
          vlr_trib: 0,
          base_cofins: 0,
          base_iss: 0,
          base_icms: 0,
          base_ipi: 0,
          base_icms_st: 0,
          num_docfis: "000014181",
          aliq_pis: 0,
          aliq_cofins: 0,
          aliq_iss: 0,
          aliq_icms: 0,
          aliq_ipi: 0,
          aliq_icms_st: 0
        },
        {
          cod_produto_servico: "PJ080-19M - CJ ECO BAGOS BLE",
          razao_social_estab: "EMP INDUSTRIA E DISTRIBUICAO S.A",
          vlr_item_merc: 202,
          vlr_trib: 0,
          base_cofins: 0,
          base_iss: 0,
          base_icms: 0,
          base_ipi: 202,
          base_icms_st: 0,
          num_docfis: "000014181",
          aliq_pis: 0,
          aliq_cofins: 0,
          aliq_iss: 0,
          aliq_icms: 0,
          aliq_ipi: 15,
          aliq_icms_st: 0
        },
        {
          cod_produto_servico: "PJ080-19M - CJ ECO BAGOS BLE",
          razao_social_estab: "EMP INDUSTRIA E DISTRIBUICAO S.A",
          vlr_item_merc: 202,
          vlr_trib: 27.88,
          base_cofins: 0,
          base_iss: 0,
          base_icms: 232.3,
          base_ipi: 0,
          base_icms_st: 0,
          num_docfis: "000014181",
          aliq_pis: 0,
          aliq_cofins: 0,
          aliq_iss: 0,
          aliq_icms: 12,
          aliq_ipi: 0,
          aliq_icms_st: 0
        }
      ];
  }
  public atualizaValorCompletoIBS = (): void => {
    let vlAliqIBS = (document.getElementById("vlSimAliqIBS") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "").replace("%", "").trim();
    let vlAliqCBS = (document.getElementById("vlSimAliqCBS") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "").replace("%", "").trim();
    let vlrProd = (document.getElementById("vlSimPrd") as HTMLSelectElement).value.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", ".").trim();
    let vlrProd2 = (document.getElementById("vlSimPrd2") as HTMLSelectElement).value.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", ".").trim();
    let vlrImpostoAtualIBS = (document.getElementById("vlImpostoAtualIBS") as HTMLSelectElement).innerText.replace("R$", "").replace(".", "").replace(".", "").replace(",", ".").trim();
    let resultCBS = (Number(vlAliqCBS) * 0.01);
    let impostoCBS = resultCBS * Number(vlrProd2);
    let resultIBS = (Number(vlAliqIBS) * 0.01);
    let impostoIBS = resultIBS * Number(vlrProd);
    let vlAcrescimoIBS = ((Number(vlrImpostoAtualIBS) - Number(impostoIBS)));
    let vlTotAliqAtual = (document.getElementById("vlTotalAliqCompleto") as HTMLSelectElement).innerText.replace("%", "");
    let vlTotAliqAtualIBS = (document.getElementById("vlTotalAliqIBS") as HTMLSelectElement).innerText.replace("%", "");
    let vlTotAliqAtualCBS = (document.getElementById("vlTotalAliqCBS") as HTMLSelectElement).innerText.replace("%", "");
    let vlImpAtual = (document.getElementById("vlImpAtual") as HTMLSelectElement).innerText.replace(",", ".").replace("R$", "").replace("%", "").trim();

    let vlPercAcrescimoCompletoIBS = ((Number(vlTotAliqAtualIBS) - Number(vlAliqIBS)));
    let vlTotalAliq = impostoIBS + impostoCBS;
    let vlAcrescimo = ((Number(vlImpAtual) - Number(vlTotalAliq)));

    let vlAliq = (Number(vlAliqIBS) + Number(vlAliqCBS));
    let vlPercAcrescimoAliq = ((Number(vlAliq) - Number(vlTotAliqAtual)));
    if (vlPercAcrescimoAliq > 0) {
      (document.getElementById("vlPercAcrescimoCompleto") as HTMLSelectElement).style.color = "#006400";
    } else {
      (document.getElementById("vlPercAcrescimoCompleto") as HTMLSelectElement).style.color = "#FF0000";
    }
    if (vlAcrescimo > 0) {
      (document.getElementById("vlAcrescimoCompleto") as HTMLSelectElement).style.color = "#006400";
    } else {
      (document.getElementById("vlAcrescimoCompleto") as HTMLSelectElement).style.color = "#FF0000";
    }
    if (vlPercAcrescimoCompletoIBS > 0) {
      (document.getElementById("vlPercAcrescimoCompletoIBS") as HTMLSelectElement).style.color = "#006400";
    } else {
      (document.getElementById("vlPercAcrescimoCompletoIBS") as HTMLSelectElement).style.color = "#FF0000";
    }
    if (vlAcrescimoIBS > 0) {
      (document.getElementById("vlAcrescimoCompletoIBS") as HTMLSelectElement).style.color = "#006400";
    } else {
      (document.getElementById("vlAcrescimoCompletoIBS") as HTMLSelectElement).style.color = "#FF0000";
    }
    (document.getElementById("vlPercAcrescimoCompleto") as HTMLSelectElement).innerText = String(vlPercAcrescimoAliq.toFixed(2)) + "%";
    (document.getElementById("vlPercAcrescimoCompletoIBS") as HTMLSelectElement).innerText = String(vlPercAcrescimoCompletoIBS.toFixed(2)) + "%";
    (document.getElementById("vlAcrescimoCompleto") as HTMLSelectElement).innerText = "R$" + this.formataValor(vlAcrescimo).replace("BLR", "");
    (document.getElementById("vlAcrescimoCompletoIBS") as HTMLSelectElement).innerText = "R$" + this.formataValor(vlAcrescimoIBS).replace("BLR", "");
    (document.getElementById("vlImpostoSimuladoIBS") as HTMLSelectElement).innerText = "R$" + this.formataValor(impostoIBS).replace("BLR", "");
    (document.getElementById("vlTotImpSimulado") as HTMLSelectElement).innerText = "R$" + this.formataValor(vlTotalAliq).replace("BLR", "");
    (document.getElementById("vlTotalAliqCompletoCalc") as HTMLSelectElement).innerText = String(vlAliq.toFixed(2)) + "%";
  }
  public atualizaValorCompletoCBS = (): void => {
    let vlAliqIBS = (document.getElementById("vlSimAliqIBS") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "").replace("%", "").trim();
    let vlAliqCBS = (document.getElementById("vlSimAliqCBS") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "").replace("%", "").trim();
    let vlrProd = (document.getElementById("vlSimPrd") as HTMLSelectElement).value.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", ".").trim();
    let vlrProd2 = (document.getElementById("vlSimPrd2") as HTMLSelectElement).value.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", ".").trim();
    let vlrImpostoAtualCBS = (document.getElementById("vlImpostoAtualCBS") as HTMLSelectElement).innerText.replace("R$", "").replace(".", "").replace(".", "").replace(",", ".").trim();

    let resultCBS = (Number(vlAliqCBS) * 0.01);
    let resultIBS = (Number(vlAliqIBS) * 0.01);
    let impostoCBS = resultCBS * Number(vlrProd2);
    let impostoIBS = resultIBS * Number(vlrProd);
    let vlAcrescimoCBS = ((Number(vlrImpostoAtualCBS) - Number(impostoCBS)));

    let vlTotAliqAtual = (document.getElementById("vlTotalAliqCompleto") as HTMLSelectElement).innerText.replace("%", "");
    let vlTotAliqAtualCBS = (document.getElementById("vlTotalAliqCBS") as HTMLSelectElement).innerText.replace("%", "");
    let vlImpAtual = (document.getElementById("vlImpAtual") as HTMLSelectElement).innerText.replace(".", "").replace(".", "").replace(",", ".").replace("R$", "").trim();

    let vlPercAcrescimoCompletoCBS = ((Number(vlTotAliqAtualCBS) - Number(vlAliqCBS)));
    let vlTotalAliq = impostoIBS + impostoCBS;
    let vlAcrescimo = ((Number(vlImpAtual) - Number(vlTotalAliq)));
    let vlAliq = (Number(vlAliqIBS) + Number(vlAliqCBS));

    let vlPercAcrescimoAliq = (Number(vlTotAliqAtual) - Number(vlAliq));
    if (vlPercAcrescimoAliq > 0) {
      (document.getElementById("vlPercAcrescimoCompleto") as HTMLSelectElement).style.color = "#006400";
    } else {
      (document.getElementById("vlPercAcrescimoCompleto") as HTMLSelectElement).style.color = "#FF0000";
    }
    if (vlAcrescimo > 0) {
      (document.getElementById("vlAcrescimoCompleto") as HTMLSelectElement).style.color = "#006400";
    } else {
      (document.getElementById("vlAcrescimoCompleto") as HTMLSelectElement).style.color = "#FF0000";
    }
    if (vlPercAcrescimoCompletoCBS > 0) {
      (document.getElementById("vlPercAcrescimoCompletoCBS") as HTMLSelectElement).style.color = "#006400";
    } else {
      (document.getElementById("vlPercAcrescimoCompletoCBS") as HTMLSelectElement).style.color = "#FF0000";
    }
    if (vlAcrescimoCBS > 0) {
      (document.getElementById("vlAcrescimoCompletoCBS") as HTMLSelectElement).style.color = "#006400";
    } else {
      (document.getElementById("vlAcrescimoCompletoCBS") as HTMLSelectElement).style.color = "#FF0000";
    }
    (document.getElementById("vlPercAcrescimoCompleto") as HTMLSelectElement).innerText = String(vlPercAcrescimoAliq.toFixed(2)) + "%";
    (document.getElementById("vlPercAcrescimoCompletoCBS") as HTMLSelectElement).innerText = String(vlPercAcrescimoCompletoCBS.toFixed(2)) + "%";
    (document.getElementById("vlAcrescimoCompleto") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlAcrescimo).replace("BLR", "");
    (document.getElementById("vlAcrescimoCompletoCBS") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlAcrescimoCBS).replace("BLR", "");
    (document.getElementById("vlTotImpSimulado") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlTotalAliq).replace("BLR", "");
    (document.getElementById("vlTotalAliqCompletoCalc") as HTMLSelectElement).innerText = String(vlAliq.toFixed(2)) + "%";
    (document.getElementById("vlImpostoSimuladoCBS") as HTMLSelectElement).innerText = "R$ " + this.formataValor(impostoCBS).replace("BLR", "");
  }
  public formataValor = (valor: number): string => {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BLR"
    }).format(valor);
  }
  public median(arr: number[]): number {
    let contador = 0;
    let tamanhoArray = arr.length;
    let soma = 0;
    let media = 0;
    arr.forEach((item) => {
      soma = soma + item;
    });
    media = soma / arr.length;
    return media;
  }
  atualizaValorCompleto2(): void {
    let vlAliqIBS = (document.getElementById("vlSimAliqIBS") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");;
    let vlAliqCBS = (document.getElementById("vlSimAliqCBS") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");;

    let vlAliq = (Number(vlAliqIBS) + Number(vlAliqCBS));

    (document.getElementById("vlTotalAliqCompletoCalc") as HTMLSelectElement).innerText = String(vlAliq.toFixed(2)) + "%";
    (document.getElementById("vlTotalAliqCompletoCalc") as HTMLSelectElement).innerText = String(vlAliq.toFixed(2)) + "%";

    let vlrProd = (document.getElementById("vlSimPrd") as HTMLSelectElement).value.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", ".");
    let vlrProd2 = (document.getElementById("vlSimPrd2") as HTMLSelectElement).value.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", ".");

    let vlrImpostoAtualIBS = (document.getElementById("vlImpostoAtualIBS") as HTMLSelectElement).innerText.replace(".", "").replace(".", "").replace(",", ".").replace("R$", "").trim();

    let resultCBS = (Number(vlAliqCBS) * 0.01);
    let impostoCBS = resultCBS * Number(vlrProd2);
    let resultIBS = (Number(vlAliqIBS) * 0.01);
    let impostoIBS = resultIBS * Number(vlrProd);
    let vlAcrescimoIBS = ((Number(vlrImpostoAtualIBS) - Number(impostoIBS)));

    (document.getElementById("vlImpostoSimuladoIBS") as HTMLSelectElement).innerText = "R$ " + this.formataValor(impostoIBS).replace("BLR", "");

    let vlTotAliqAtual = (document.getElementById("vlTotalAliqCompleto") as HTMLSelectElement).innerText.replace("%", "");
    let vlTotAliqAtualIBS = (document.getElementById("vlTotalAliqIBS") as HTMLSelectElement).innerText.replace("%", "");
    let vlTotAliqAtualCBS = (document.getElementById("vlTotalAliqCBS") as HTMLSelectElement).innerText.replace("%", "");
    let vlImpAtual = (document.getElementById("vlImpAtual") as HTMLSelectElement).innerText.replace(".", "").replace(".", "").replace(",", ".").replace("R$", "").trim();

    let vlPercAcrescimoCompletoIBS = ((Number(vlTotAliqAtualIBS) - Number(vlAliqIBS)));
    let vlTotalAliq = impostoIBS + impostoCBS;
    let vlAcrescimo = ((Number(vlImpAtual) - Number(vlTotalAliq)));

    let vlPercAcrescimoAliq = (Number(vlTotAliqAtual) - Number(vlAliq));
    (document.getElementById("vlPercAcrescimoCompleto") as HTMLSelectElement).innerText = String(vlPercAcrescimoAliq.toFixed(2)) + "%";
    (document.getElementById("vlPercAcrescimoCompletoIBS") as HTMLSelectElement).innerText = String(vlPercAcrescimoCompletoIBS.toFixed(2)) + "%";
    (document.getElementById("vlAcrescimoCompleto") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlAcrescimo).replace("BLR", "");
    (document.getElementById("vlAcrescimoCompletoIBS") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlAcrescimoIBS).replace("BLR", "");
    (document.getElementById("vlTotImpSimulado") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlTotalAliq).replace("BLR", "");
    (document.getElementById("vlTotalAliqCompletoCalc") as HTMLSelectElement).innerText = String(vlAliq.toFixed(2)) + "%";
  }
  
  teste(): void {
  }
  
  atualizaValorCompleto3(): void{

    let vlAliqIBS = (document.getElementById("vlSimAliqIBS") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");
    let vlAliqCBS = (document.getElementById("vlSimAliqCBS") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");
    let vlAliq = (Number(vlAliqIBS) + Number(vlAliqCBS));

    (document.getElementById("vlTotalAliqCompletoCalc") as HTMLSelectElement).innerText = String(vlAliq.toFixed(2)) + "%";
    (document.getElementById("vlTotalAliqCompletoCalc") as HTMLSelectElement).innerText = String(vlAliq.toFixed(2)) + "%";

    let vlrProd = (document.getElementById("vlSimPrd") as HTMLSelectElement).value.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", ".");
    let vlrProd2 = (document.getElementById("vlSimPrd2") as HTMLSelectElement).value.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", ".");

    let vlrImpostoAtualCBS = (document.getElementById("vlImpostoAtualCBS") as HTMLSelectElement).innerText.replace("R$", "").replace(".", "").replace(".", "").replace(",", ".");

    let resultCBS = (Number(vlAliqCBS) * 0.01);
    let impostoCBS = resultCBS * Number(vlrProd2);
    let resultIBS = (Number(vlAliqIBS) * 0.01);

    let impostoIBS = resultIBS * Number(vlrProd);

    let vlAcrescimoCBS = ((Number(vlrImpostoAtualCBS) - Number(impostoCBS)));

    (document.getElementById("vlImpostoSimuladoCBS") as HTMLSelectElement).innerText = "R$ " + this.formataValor(impostoCBS).replace("BLR", "");

    let vlTotAliqAtual = (document.getElementById("vlTotalAliqCompleto") as HTMLSelectElement).innerText.replace("%", "");
    let vlTotAliqAtualIBS = (document.getElementById("vlTotalAliqIBS") as HTMLSelectElement).innerText.replace("%", "");
    let vlTotAliqAtualCBS = (document.getElementById("vlTotalAliqCBS") as HTMLSelectElement).innerText.replace("%", "");
    let vlImpAtual = (document.getElementById("vlImpAtual") as HTMLSelectElement).innerText.replace(".", "").replace(".", "").replace(",", ".").replace("R$", "").trim();

    let vlPercAcrescimoCompletoCBS = ((Number(vlTotAliqAtualCBS) - Number(vlAliqCBS)));
    let vlTotalAliq = impostoIBS + impostoCBS;
    let vlAcrescimo = ((Number(vlImpAtual) - Number(vlTotalAliq)));


    let vlPercAcrescimoAliq = (Number(vlTotAliqAtual) - Number(vlAliq));
    (document.getElementById("vlPercAcrescimoCompleto") as HTMLSelectElement).innerText = String(vlPercAcrescimoAliq.toFixed(2)) + "%";
    (document.getElementById("vlPercAcrescimoCompletoCBS") as HTMLSelectElement).innerText = String(vlPercAcrescimoCompletoCBS.toFixed(2)) + "%";
    (document.getElementById("vlAcrescimoCompleto") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlAcrescimo).replace("BLR", "");
    (document.getElementById("vlAcrescimoCompletoCBS") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlAcrescimoCBS).replace("BLR", "");
    (document.getElementById("vlTotImpSimulado") as HTMLSelectElement).innerText = "R$ " + this.formataValor(vlTotalAliq).replace("BLR", "");
    (document.getElementById("vlTotalAliqCompletoCalc") as HTMLSelectElement).innerText = String(vlAliq.toFixed(2)) + "%";
  }
  public async somaIBS() {
    let vlrAlqICMS = (document.getElementById("vlrAliqIcmsTxt") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");
    let vlrAlqICMSST = (document.getElementById("vlrAliqIcmsSTTxt") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");
    let vlrAlqISS = (document.getElementById("vlrIssTxt") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");
    let vlAliqIBS = Number(vlrAlqICMS) + Number(vlrAlqICMSST) + Number(vlrAlqISS);

    (document.getElementById("vlSimAliqIBS") as HTMLSelectElement).value = String(vlAliqIBS.toFixed(2));
    this.atualizaValorCompletoIBS();
  }
  public async somaCBS() {

    let vlrAlqIPI = (document.getElementById("vlrAliqIpiTxt") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");
    let vlrAlqPIS = (document.getElementById("vlrPisTxt") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");
    let vlrAlqCofins = (document.getElementById("vlrAliqCofinsTxt") as HTMLSelectElement).value.replace(",", ".").replace("R$ ", "").replace("%", "");;
    let vlAliqCBS = Number(vlrAlqIPI) + Number(vlrAlqPIS) + Number(vlrAlqCofins);
    let resultCBS = (Number(vlAliqCBS) * 0.01);
    (document.getElementById("vlSimAliqCBS") as HTMLSelectElement).value = String(vlAliqCBS.toFixed(2));
    this.atualizaValorCompletoCBS();
  }
}
