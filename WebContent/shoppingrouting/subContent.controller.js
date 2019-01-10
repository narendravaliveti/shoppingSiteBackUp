sap.ui.controller("routing.shoppingrouting.subContent", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf routing.shoppingrouting.subContent
     */
    onInit: function () {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRouteMatched("sub", (oEvnt) => {
            if (oEvnt.getParameter("name") === "sub") {
                let oUserModel = this.getOwnerComponent().getModel("userModel");
                let oLUser = oUserModel.getProperty("/loggedin");
                let oArguments = oEvnt.getParameter("arguments");
                oUserModel.setProperty("/Parameters/UserId",oArguments.userId);
                oUserModel.setProperty("/Parameters/CtgryId",oArguments.ctgryId);
                if (oLUser.UserId === undefined) {
                    let oOptions = {
                        "IvUserid": oArguments.userId,
                    };
                    this.getOwnerComponent().callServer(oOptions, "Z03_API_LOGIN_SUCCESS").then((oResponse) => {
                        oUserModel.setProperty("/loggedin", oResponse.EsUser);
                        oUserModel.setProperty("/category", oResponse.EtCtgry);
                    });
                }

                let oOptions = {
                    "IvCtgryid": oArguments.ctgryId,
                };
                this.getOwnerComponent().callServer(oOptions, "Z03_API_GET_PRDTS").then((oResponse) => {
                    let oUserModel = this.getOwnerComponent().getModel("userModel");
                    oUserModel.setProperty("/Products", oResponse.EtPrdts);
                });
            }
        });

    },
    oListBtn(oEvnt) {
        let press = oEvnt.getSource().getPressed();
        if(press) {
            this.getView().oCtgryList.setVisible(false);
            this.getView().oPrdtCntFBox.setDefaultSpan("L3 M12 S12");
        }else {
            this.getView().oCtgryList.setVisible(true);
            this.getView().oPrdtCntFBox.setDefaultSpan("L4 M12 S12");
        }
    },
    // oCrtBtnEvt() {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let oRoute = this.getOwnerComponent().getRouter();
    //     let userId = oUserModel.getProperty("/loggedin").UserId;
    //     oRoute.navTo("cart",{ userId: userId });
    // },
    // oRemoveEvt(oEvnt) {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let path = oEvnt.getSource().getBindingContext("userModel").getPath();
    //     let oPrdt = oUserModel.getProperty(path);
    //     oPrdt.Updkz = "D";
    //     oUserModel.setProperty(path, JSON.parse(JSON.stringify(oPrdt)));
    //     debugger
    // },
    // oSaveEvt() {
    //     debugger
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let oOptions = {
    //         "ItPrdts": oUserModel.getProperty("/Products"),
    //         "ItSpecs": oUserModel.getProperty("/Specifications")
    //     };
    //     this.getOwnerComponent().callServer(oOptions,"Z03_API_SET_PRDTS").then((oResponse)=>{
    //         if(oResponse.EvMsg === "SUCCESS"){
    //             oUserModel.setProperty("/Products",oResponse.EtPrdts);
    //         }
    //     });
    // },
    // oProfileEvt() {
    //     this.getView().oMenuBtnProfile.setVisible(false);
    //     this.getView().oMenuBtnLogOut.setVisible(false);
    //     this.getView().oSubCntFBox.setVisible(false);
    //     this.getView().oProfileFBox.setVisible(true);
    // },
    // oLogOutEvt() {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let oLUser = oUserModel.getProperty("/loggedin");
    //     oLUser = {};
    //     oUserModel.setProperty("/loggedin", oLUser);
    //     this.getOwnerComponent().getRouter().navTo("logIn");
    // },
    // oProfileBackEvt() {
    //     this.getView().oMenuBtnProfile.setVisible(true);
    //     this.getView().oMenuBtnLogOut.setVisible(true);
    //     this.getView().oProfileFBox.setVisible(false);
    //     this.getView().oSubCntFBox.setVisible(true);
    // },
    // oAddEvt() {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     oUserModel.setProperty("/Visible/SubContent","FALSE");
    //     oUserModel.setProperty("/Visible/AddPrdtForm","TRUE");
    //     let oSpecTable = oUserModel.getProperty("/SpecificationsTable");
    //     oSpecTable = [{},{},{},{},{}];
    //     oUserModel.setProperty("/SpecificationsTable",oSpecTable);
    // },
    // oNextFormEvt() {
    //     this.getOwnerComponent().getModel("userModel").setProperty("/Visible/AddPrdtForm","FALSE");
    // },
    // oCnclEvt() {
    //     this.getOwnerComponent().getModel("userModel").setProperty("/Visible/SubContent","TRUE");
    // },
    // oSetPrdtEvt() {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let oPrdtForm = oUserModel.getProperty("/ProductForm");
    //     oPrdtForm.CtgryId = oUserModel.getProperty("/Parameters/CtgryId");
    //     oPrdtForm.Owner = oUserModel.getProperty("/Parameters/UserId");
    //     let oSpecTable = oUserModel.getProperty("/SpecificationsTable");
    //     oSpecTable.forEach((oCnt,sIdx)=>{
    //        oCnt.ProductId = oPrdtForm.ProductId;
    //        oCnt.SpecId = ("00"+(sIdx+1)).slice(-3);
    //        oCnt.Updkz = "I";
    //     });
    //     let oPrdts = oUserModel.getProperty("/Products");
    //     let oSpecs = oUserModel.getProperty("/Specifications");
    //     oPrdts.push(JSON.parse(JSON.stringify(oPrdtForm)));
    //     oUserModel.setProperty("/Products",oPrdts);
    //     oUserModel.setProperty("/Specifications",JSON.parse(JSON.stringify(oSpecTable)));
    //     this.getOwnerComponent().getModel("userModel").setProperty("/Visible/SubContent","TRUE");
    // },
    // oBackEvt() {
    //     this.getOwnerComponent().getModel("userModel").setProperty("/Visible/AddPrdtForm","TRUE")
    // },
    // oDelEvt() {
    //   debugger
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let arSelSpec = this.getView().oSpecTable.getSelectedIndices();
    //     let arSpec = oUserModel.getProperty("/SpecificationsTable");
    //     arSelSpec.forEach((oCnt)=>{
    //         debugger
    //         arSpec.forEach((oCnt1,sIdx)=>{
    //             if(oCnt === sIdx){
    //                 arSpec.splice(sIdx);
    //             }
    //         })
    //     })
    //     oUserModel.setProperty("/SpecificationsTable",arSpec);
    // },
    // oSubCntBackEvt() {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let userId = oUserModel.getProperty("/loggedin").UserId;
    //     this.getOwnerComponent().getRouter().navTo("main", {userId: userId});
    // },
    // oProImgEvt(oEvnt) {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let userId = oUserModel.getProperty("/loggedin").UserId;
    //     let ctgryId = oUserModel.getProperty("/Products/0").CtgryId;
    //     let prdtId = oEvnt.getSource().getBindingContext("userModel").getObject().ProductId;
    //     this.getOwnerComponent().getRouter().navTo("pro",{userId: userId, ctgryId: ctgryId, prdtId: prdtId});
    // },
    // oAddCrtBtn(oEvnt) {
    //     debugger
    //     let oCrtData = oEvnt.getSource().getParent().getBindingContext("userModel").getObject();
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let oLUser = oUserModel.getProperty("/loggedin");
    //     let oOptions = {
    //         "IsCart": {
    //             "UserId": oLUser.UserId,
    //             "ProductId": oCrtData.ProductId,
    //             "Quantity": "1"
    //         }
    //     };
    //     this.getOwnerComponent().callServer(oOptions,"Z03_API_SET_CART").then((oResponse)=>{
    //         debugger
    //     });
    // },
    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf routing.shoppingrouting.subContent
     */
    onBeforeRendering: function () {

    },

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf routing.shoppingrouting.subContent
     */
//	onAfterRendering: function() {
//
//	},

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf routing.shoppingrouting.subContent
     */
//	onExit: function() {
//
//	}

});