sap.ui.controller("routing.shoppingrouting.mainContent", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf routing.shoppingrouting.mainContent
     */
    onInit: function () {
        let oController = this,
            oRouter = this.getOwnerComponent().getRouter();

        oRouter.attachRouteMatched("main", (oEvnt) => {
            if (oEvnt.getParameter("name") === "main") {
                let oArguments = oEvnt.getParameter("arguments");
                let oOptions = {
                    "IvUserid": oArguments.userId
                };
                this.getOwnerComponent().callServer(oOptions, "Z03_API_LOGIN_SUCCESS").then((oResponse) => {
                    // let oBinding = oController.getView().oMainCntFBox.getBinding("content");
                    // if(oBinding && oResponse.EsUser.Role === "USER"){
                    //     oBinding.filter([
                    //         new sap.ui.model.Filter(
                    //             "Status",
                    //             sap.ui.model.FilterOperator.EQ,
                    //             "true"
                    //         )
                    //     ]);
                    // } else {
                    //     oBinding.filter([
                    //         new sap.ui.model.Filter(
                    //             "Status",
                    //             sap.ui.model.FilterOperator.EQ,
                    //             "true"
                    //         ),
                    //         new sap.ui.model.Filter(
                    //             "Status",
                    //             sap.ui.model.FilterOperator.EQ,
                    //             "false"
                    //         )
                    //     ]);
                    // }
                    let oUserModel = this.getOwnerComponent().getModel("userModel");
                    oUserModel.setProperty("/loggedin", oResponse.EsUser);
                    if(oResponse.EsUser.Role === "ADMIN"){
                        oUserModel.setProperty("/MainCnt/DefaultSpan","L4 M12 S12");
                    }
                    oUserModel.setProperty("/category", []);
                    oUserModel.setProperty("/category", oResponse.EtCtgry);
                    // let aData = [
                    //     {"test":[oResponse.EtCtgry[0], oResponse.EtCtgry[1], oResponse.EtCtgry[2]]},
                    //     {"test":[oResponse.EtCtgry[1]]},
                    //     {"test":[oResponse.EtCtgry[2]]}
                    // ];
                    // oUserModel.setProperty("/categoryTest", aData);
                });
            }
        });
    },
    oListBtn(oEvnt) {
        let oUserModel= this.getOwnerComponent().getModel("userModel");
        let press = oEvnt.getSource().getPressed();
        if(press) {
            oUserModel.setProperty("/Visible/CtgryList","");
            oUserModel.setProperty("/MainCnt/DefaultSpan","L3 M12 S12");
        }else {
            oUserModel.setProperty("/Visible/CtgryList","X");
            oUserModel.setProperty("/MainCnt/DefaultSpan","L4 M12 S12");
        }
    },
    oAddCtgryBtn() {
        let oUserModel= this.getOwnerComponent().getModel("userModel");
        oUserModel.setProperty("/Visible/MainCnt","");
        oUserModel.setProperty("/Visible/AddCtgryPanel","X");
    },
    oEditCtgry(oEvnt) {
        debugger
        let oUserModel= this.getOwnerComponent().getModel("userModel");
        let path = oEvnt.getSource().getBindingContext("userModel").getPath();
        this.getView().oEditCtgryPanel.bindElement("userModel>"+path);
        oUserModel.setProperty("/Visible/MainCnt","");
        oUserModel.setProperty("/Visible/AddCtgryPanel","");
    },
    oAddSpecSuggBtn(oEvnt) {
        debugger
        this.getView().oSpecSuggDialog.open();
    },
    oAcntOpen(oEvnt){
        debugger
        this.getView().oAcntPop.openBy(oEvnt.getSource());
    },
    // oCrtBtnEvt() {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let oRoute = this.getOwnerComponent().getRouter();
    //     this.getView().oProfileFBox.setVisible(false);
    //     this.getView().oMainCntFBox.setVisible(true);
    //     let userId = oUserModel.getProperty("/loggedin").UserId;
    //     oRoute.navTo("cart", {userId: userId});
    // },
    // oProfileEvt() {
    //     this.getView().oMenuBtnProfile.setVisible(false);
    //     this.getView().oMenuBtnLogOut.setVisible(false);
    //     this.getView().oMainCntFBox.setVisible(false);
    //     this.getView().oProfileFBox.setVisible(true);
    // },
    // oLogOutEvt() {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let oLUser = oUserModel.getProperty("/loggedin");
    //     oLUser.Fname = "";
    //     oLUser.Lname = "";
    //     oLUser.Gender = "";
    //     oLUser.BirthDate = "";
    //     oLUser.Email = "";
    //     oLUser.Mobile = "";
    //     oLUser.Role = "";
    //     oLUser.UserId = "";
    //     oLUser.Password = "";
    //     this.oProfileBackEvt();
    //     oUserModel.setProperty("/loggedin", oLUser);
    //     this.getView().oProfileFBox.setVisible(false);
    //     this.getView().oMainCntFBox.setVisible(true);
    //     this.getOwnerComponent().getRouter().navTo("logIn");
    // },
    // oProfileBackEvt() {
    //     this.getView().oMenuBtnProfile.setVisible(true);
    //     this.getView().oMenuBtnLogOut.setVisible(true);
    //     this.getView().oProfileFBox.setVisible(false);
    //     this.getView().oMainCntFBox.setVisible(true);
    // },
    // oAddEvt() {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     oUserModel.setProperty("/Visible/MainContent", "FALSE");
    //     oUserModel.setProperty("/Visible/AddCtgryForm", "TRUE");
    // },
    oSlctCtgry(oEvnt) {
        debugger
        let path = oEvnt.getSource().getBindingContext("userModel").getPath();
        let oUserModel = this.getOwnerComponent().getModel("userModel");
        let oLUser = oUserModel.getProperty("/loggedin");
        let userId = oUserModel.getProperty("/loggedin").UserId;
        let ctgryId = oUserModel.getProperty(path).CtgryId;
        this.getOwnerComponent().getRouter().navTo("sub", {userId: userId, ctgryId: ctgryId});
    },
    // oSwitchStatusEvt(oEvnt) {
    //     let path = oEvnt.getSource().getBindingContext("userModel").getPath();
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let oCtgry = oUserModel.getProperty(path);
    //     oCtgry.Status = oEvnt.getParameter("state");
    //     oCtgry.Updkz = "U";
    //     oUserModel.setProperty(path, oCtgry);
    // },
    // oEditEvt(oEvnt) {
    //     debugger
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let path = oEvnt.getSource().getBindingContext("userModel").getPath();
    //     let oEditCtgry = JSON.parse(JSON.stringify(oUserModel.getProperty(path)));
    //     // if(oEditCtgry.Status === "true"){
    //     //     oEditCtgry.Status = true;
    //     // }else if(oEditCtgry.Status === "false"){
    //     //     oEditCtgry.Status = false;
    //     // }
    //     // oUserModel.setProperty("/CategoryForm",oEditCtgry);
    //     this.getView().oEditCtgryForm.bindElement("userModel>" + path);
    //     oUserModel.setProperty("/Visible/MainContent", "FALSE");
    //     oUserModel.setProperty("/Visible/AddCtgryForm", "FALSE");
    // },
    // oEditCtgryEvt(oEvnt) {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let path = oEvnt.getSource().getBindingContext("userModel").getPath();
    //     let oCtgry = oUserModel.getProperty(path);
    //     oCtgry.Updkz = "U";
    //     oUserModel.setProperty(path, JSON.parse(JSON.stringify(oCtgry)));
    //     oUserModel.setProperty("/Visible/MainContent", "TRUE");
    // },
    // oBackEvt() {
    //     this.getOwnerComponent().getModel("userModel").setProperty("/Visible/MainContent", "TRUE");
    // },
    // oRemoveEvt(oEvnt) {
    //     let oUserModel = this.getOwnerComponent().getModel("userModel");
    //     let path = oEvnt.getSource().getBindingContext("userModel").getPath();
    //     let oCtgry = oUserModel.getProperty(path);
    //     oCtgry.Updkz = "D";
    //     oUserModel.setProperty(path, JSON.parse(JSON.stringify(oCtgry)));
    //     debugger
    // },
    // oImgChangeEvt(oEvent) {
    //     oController = this;
    //     let oModel = oController.getOwnerComponent().getModel("userModel");
    //     let oSource = oEvent.getSource();
    //     if (oSource) {
    //         var oFile = oEvent.getParameter("files")[0];
    //         oModel.setProperty("/ImgSrc", oFile);
    //         oSource.upload();
    //     }
    // },
    // oImgUploadEvt(oEvent) {
    //     oController = this;
    //     let oModel = oController.getOwnerComponent().getModel("userModel");
    //     var oFile = oModel.getProperty("/ImgSrc");
    //     if (oFile) {
    //         let oReader = new FileReader();
    //         oReader.onload = function (oEvent) {
    //             let sBufferData = oEvent.target.result;
    //             oModel.setProperty("/CategoryForm/ImgSrc", sBufferData);
    //         };
    //         oReader.readAsDataURL(oFile);
    //     }
    // },
    // oAddCtgryEvt() {
    //     var oUserModel = this.getOwnerComponent().getModel("userModel");
    //     var userId = oUserModel.getProperty("/loggedin").userId;
    //     var arCtgry = oUserModel.getProperty("/category");
    //     var oForm = oUserModel.getProperty("/CategoryForm");
    //     oForm.CreatedBy = userId;
    //     oForm.Updkz = "I";
    //     arCtgry.push(JSON.parse(JSON.stringify(oForm)));
    //     oUserModel.setProperty("/category", arCtgry);
    //     debugger
    //     oUserModel.setProperty("/Visible/AddCtgryForm", "TRUE");
    //     oUserModel.setProperty("/Visible/MainContent", "TRUE");
    // },
    // oSaveEvt() {
    //     var oUserModel = this.getOwnerComponent().getModel("userModel");
    //     var arCtgry = oUserModel.getProperty("/category");
    //     var arCtgryUpd = [];
    //     arCtgry.forEach((oCnt) => {
    //         if (oCnt.Updkz !== "") {
    //             arCtgryUpd.push(oCnt);
    //         }
    //     });
    //     if (arCtgryUpd) {
    //         let oOptions = {
    //             "ItCtgry": arCtgryUpd
    //         };
    //         this.getOwnerComponent().callServer(oOptions, "Z03_API_SET_CTGRY").then((oResponse) => {
    //             if (oResponse.EvMsg === 'SUCCESS') {
    //                 oUserModel.setProperty("/category", oResponse.EtCtgry);
    //                 debugger
    //             }
    //         });
    //     }
    // }
    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf routing.shoppingrouting.mainContent
     */
//	onBeforeRendering: function() {
//
//	},

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf routing.shoppingrouting.mainContent
     */
//	onAfterRendering: function() {
//
//	},

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf routing.shoppingrouting.mainContent
     */
//	onExit: function() {
//
//	}

});