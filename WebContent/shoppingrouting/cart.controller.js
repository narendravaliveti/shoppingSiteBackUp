sap.ui.controller("routing.shoppingrouting.cart", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf routing.shoppingrouting.cart
*/
	onInit: function() {
    let oRouter = this.getOwnerComponent().getRouter();
    oRouter.attachRouteMatched("cart", (oEvnt) => {
        if (oEvnt.getParameter("name") === "cart") {
            let oSampModel = this.getOwnerComponent().getModel("userModel");
            let oLUser = oSampModel.getProperty("/loggedin");
            let oArguments = oEvnt.getParameter("arguments");
            let oOptions = {
                "IvUserid": oArguments.userId
            };
            if( oLUser.UserId === undefined ) {
                this.getOwnerComponent().callServer(oOptions, "Z03_API_LOGIN_SUCCESS").then((oResponse) => {
                    oSampModel.setProperty("/loggedin", oResponse.EsUser);
                    oSampModel.setProperty("/category", oResponse.EtCtgry);
                    debugger;
                });
            };
            this.getOwnerComponent().callServer(oOptions, "Z03_API_GET_CART").then((oResponse) => {
                let oSampModel = this.getOwnerComponent().getModel("userModel");
                oSampModel.setProperty("/Cart", oResponse.EtPrdts);
                debugger;
            });
            this.getView().oProfileFBox.setVisible(false);
            this.getView().oCrtCntFBox.setVisible(true);
        }
    });
	},
    oProfileEvt() {
        this.getView().oMenuBtnProfile.setVisible(false);
        this.getView().oMenuBtnLogOut.setVisible(false);
        this.getView().oCrtCntFBox.setVisible(false);
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
        oSampModel.setProperty("/loggedin", oLUser);
        this.getOwnerComponent().getRouter().navTo("logIn");
    },
    oProfileBackEvt() {
        this.getView().oMenuBtnProfile.setVisible(true);
        this.getView().oMenuBtnLogOut.setVisible(true);
        this.getView().oProfileFBox.setVisible(false);
        this.getView().oCrtCntFBox.setVisible(true);
    },
    oCrtCntBackEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let userId = oSampModel.getProperty("/loggedin").UserId;
        this.getOwnerComponent().getRouter().navTo("main",{userId: userId});
    },
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf routing.shoppingrouting.cart
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf routing.shoppingrouting.cart
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf routing.shoppingrouting.cart
*/
//	onExit: function() {
//
//	}

});