sap.ui.controller("routing.shoppingrouting.mainContent", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf routing.shoppingrouting.mainContent
     */
    onInit: function () {
        // let oRouter = this.getOwnerComponent().getRouter();
        // oRouter.attachRouteMatched("main/{userId}", (oEvnt) => {
        //     if (oEvnt.getParameter("name") === "main") {
        //
        //     }
        // });
    },
    crtBtnEvt: function () {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let oRoute = this.getOwnerComponent().getRouter();
        oRoute.navTo("cart");
    },
    profileEvt() {
        this.getView().menuBtnProfile.setVisible(false);
        this.getView().menuBtnLogOut.setVisible(false);
        this.getView().mainCntFBox.setVisible(false);
        this.getView().profileFBox.setVisible(true);
    },
    logOutEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let lUser = oSampModel.getProperty("/loggedin");
        lUser.fname = "";
        lUser.lname = "";
        lUser.dob = "";
        lUser.email = "";
        lUser.mobile = "";
        lUser.password = "";
        this.profileBackEvt();
        oSampModel.setProperty("/loggedin", lUser);
        this.getOwnerComponent().getRouter().navTo("logIn");
    },
    profileBackEvt() {
        this.getView().menuBtnProfile.setVisible(true);
        this.getView().menuBtnLogOut.setVisible(true);
        this.getView().profileFBox.setVisible(false);
        this.getView().mainCntFBox.setVisible(true);
    },
    mainTileEvt(oEvnt) {
        let subCntTilePath = oEvnt.getSource().getBinding("header").getContext().getPath();
        this.getOwnerComponent().getModel("userModel").setProperty("/bindpath", `userModel>${subCntTilePath}`);
        // this.getView().subCntFBox.bindElement(`userModel>${subCntTilePath}`);
        this.getOwnerComponent().getRouter().navTo("sub");
    },
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