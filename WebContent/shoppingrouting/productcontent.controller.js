sap.ui.controller("routing.shoppingrouting.productcontent", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf routing.shoppingrouting.productcontent
     */
    onInit: function () {
        // let oRouter = this.getOwnerComponent().getRouter();
        // oRouter.attachRouteMatched("pro", (oEvnt) => {
        //     if (oEvnt.getParameter("name") === "pro") {
        //         let oSampModel = this.getOwnerComponent().getModel("userModel");
        //         let oLUser = oSampModel.getProperty("/loggedin");
        //         let oPrdt = oSampModel.getProperty("/Products");
        //         let oArguments = oEvnt.getParameter("arguments");
        //         if (oLUser.UserId === undefined) {
        //             let oOptions = {
        //                 "IvUserid": oArguments.userId,
        //             };
        //             this.getOwnerComponent().callServer(oOptions, "Z03_API_LOGIN_SUCCESS").then((oResponse) => {
        //                 oSampModel.setProperty("/loggedin", oResponse.EsUser);
        //                 oSampModel.setProperty("/category", oResponse.EtCtgry);
        //                 debugger;
        //             });
        //         }
        //         if (oPrdt !== []) {
        //             let oOptions = {
        //                 "IvCtgryid": oArguments.ctgryId,
        //             };
        //             this.getOwnerComponent().callServer(oOptions, "Z03_API_GET_PRDTS").then((oResponse) => {
        //                 let oSampModel = this.getOwnerComponent().getModel("userModel");
        //                 oSampModel.setProperty("/Products", oResponse.EtPrdts);
        //                 debugger;
        //             });
        //         }
        //         let oOptions = {
        //                 "IvPrdtid": oArguments.prdtId
        //             };
        //             this.getOwnerComponent().callServer(oOptions, "Z03_API_GET_PRDT_SPEC").then((oResponse) => {
        //                 let oSampModel = this.getOwnerComponent().getModel("userModel");
        //                 oSampModel.setProperty("/Specifications", oResponse.EtSpec);
        //                 debugger;
        //             });
        //     }
        //     this.getView().oProfileFBox.setVisible(false);
        //     this.getView().oProHeader.setVisible(true);
        // });

    },
    // oCrtBtnEvt() {
    //     let oRoute = this.getOwnerComponent().getRouter();
    //     oRoute.navTo("cart");
    // },
    // oProfileEvt() {
    //     this.getView().oMenuBtnProfile.setVisible(false);
    //     this.getView().oMenuBtnLogOut.setVisible(false);
    //     this.getView().oProHeader.setVisible(false);
    //     this.getView().oProfileFBox.setVisible(true);
    // },
    // oLogOutEvt() {
    //     let oSampModel = this.getOwnerComponent().getModel("userModel");
    //     let oLUser = oSampModel.getProperty("/loggedin");
    //     oLUser.fname = "";
    //     oLUser.lname = "";
    //     oLUser.gender = "";
    //     oLUser.dob = "";
    //     oLUser.email = "";
    //     oLUser.mobile = "";
    //     oLUser.userid = "";
    //     oLUser.password = "";
    //     oSampModel.setProperty("/loggedin", oLUser);
    //     this.getOwnerComponent().getRouter().navTo("logIn");
    // },
    // oProfileBackEvt() {
    //     this.getView().oMenuBtnProfile.setVisible(true);
    //     this.getView().oMenuBtnLogOut.setVisible(true);
    //     this.getView().oProfileFBox.setVisible(false);
    //     this.getView().oProHeader.setVisible(true);
    // },
    // oProCntBackEvt() {
    //     let oSampModel = this.getOwnerComponent().getModel("userModel");
    //     let userId = oSampModel.getProperty("/loggedin").UserId;
    //     let ctgryId = oSampModel.getProperty("/Products/0").CtgryId;
    //     this.getOwnerComponent().getRouter().navTo("sub",{ userId: userId , ctgryId: ctgryId });
    // },
    // oAddCrtBtn(oEvnt) {
    //     let oCrtData = oEvnt.getSource().getParent().getBindingContext("userModel").getObject();
    //     let oSampModel = this.getOwnerComponent().getModel("userModel");
    //     let oLUser = oSampModel.getProperty("/loggedin");
    //     let arCart = oSampModel.getProperty("/cart");
    //     // for (let i = 0; i < arCart.length; i++) {
    //     //
    //     //     if (oLUser.mobile !== "" && oLUser.mobile === arCart[i].mobile) {
    //     //
    //     //         arCart[i].products.push(JSON.parse(JSON.stringify(oCrtData)));
    //     //
    //     //     }
    //     // }
    //     arCart.forEach((oCrt) => {
    //         if (oLUser.userid !== "" && oLUser.userid === oCrt.userid) {
    //             oCrt.products.push(JSON.parse(JSON.stringify(oCrtData)));
    //         }
    //     });
    //     oSampModel.setProperty("/cart", arCart);
    // },

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf routing.shoppingrouting.productcontent
     */
//	onBeforeRendering: function() {
//
//	},

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf routing.shoppingrouting.productcontent
     */
//	onAfterRendering: function() {
//
//	},

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf routing.shoppingrouting.productcontent
     */
//	onExit: function() {
//
//	}

});