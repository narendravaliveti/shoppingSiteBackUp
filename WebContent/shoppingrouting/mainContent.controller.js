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
    oCrtBtnEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let oRoute = this.getOwnerComponent().getRouter();
        this.getView().oProfileFBox.setVisible(false);
        this.getView().oMainCntFBox.setVisible(true);
        oRoute.navTo("cart");
    },
    oProfileEvt() {
        this.getView().oMenuBtnProfile.setVisible(false);
        this.getView().oMenuBtnLogOut.setVisible(false);
        this.getView().oMainCntFBox.setVisible(false);
        this.getView().oProfileFBox.setVisible(true);
    },
    oLogOutEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let oLUser = oSampModel.getProperty("/loggedin");
        oLUser.fname = "";
        oLUser.lname = "";
        oLUser.gender = "";
        oLUser.dob = "";
        oLUser.email = "";
        oLUser.mobile = "";
        oLUser.userid = "";
        oLUser.password = "";
        this.oProfileBackEvt();
        oSampModel.setProperty("/loggedin", oLUser);
        this.getView().oProfileFBox.setVisible(false);
        this.getView().oMainCntFBox.setVisible(true);
        this.getOwnerComponent().getRouter().navTo("logIn");
    },
    oProfileBackEvt() {
        this.getView().oMenuBtnProfile.setVisible(true);
        this.getView().oMenuBtnLogOut.setVisible(true);
        this.getView().oProfileFBox.setVisible(false);
        this.getView().oMainCntFBox.setVisible(true);
    },
    oMainTileEvt(oEvnt) {
        let subCntTilePath = oEvnt.getSource().getBinding("header").getContext().getPath();
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let arSUser = oSampModel.getProperty("/signedup");
        let oLUser = oSampModel.getProperty("/loggedin");
        for (let i = 0; i < arSUser.length; i++) {
            let path = subCntTilePath+"/items";
            if (oLUser.password === arSUser[i].password && oLUser.userid === arSUser[i].userid) {
                // if(arSUser[i].role === "admin") {
                //     var arCtgry = this.getOwnerComponent().getModel("userModel").getProperty(path);
                //     arCtgry.forEach((oCnt)=>{
                //         oCnt.switchvisible = true;
                //         oCnt.prdtstatus = true});
                //     this.getOwnerComponent().getModel("userModel").setProperty(path,arCtgry);
                // }else{
                //     var arCtgry = this.getOwnerComponent().getModel("userModel").getProperty(path);
                //     arCtgry.forEach((oCnt)=>{
                //         oCnt.switchvisible = false;
                //         if(oCnt.switchstatus === true) {
                //             oCnt.prdtstatus = true
                //         }else{
                //             oCnt.prdtstatus = false
                //         }
                //     });
                //     this.getOwnerComponent().getModel("userModel").setProperty(path,arCtgry);
                // }
                oLUser = JSON.parse(JSON.stringify(arSUser[i]));
            }
        }
        this.getOwnerComponent().getModel("userModel").setProperty("/subcntbindpath", `userModel>${subCntTilePath}`);
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