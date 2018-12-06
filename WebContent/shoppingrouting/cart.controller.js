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
            let cart = oSampModel.getProperty("/cart");
            let lUser = oSampModel.getProperty("/loggedin");
            for(let i=0;i<cart.length;i++){
                if(lUser.mobile !== "" && lUser.mobile === cart[i].mobile){
                    let bindpath = "userModel>/cart/"+i;
                    if (bindpath) {
                        this.getView().crtCntFBox.bindElement(bindpath);
                    }
                }
            }
        }
    });
	},
    profileEvt() {
        this.getView().menuBtnProfile.setVisible(false);
        this.getView().menuBtnLogOut.setVisible(false);
        this.getView().crtCntFBox.setVisible(false);
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
        oSampModel.setProperty("/loggedin", lUser);
        this.getOwnerComponent().getRouter().navTo("logIn");
    },
    profileBackEvt() {
        this.getView().menuBtnProfile.setVisible(true);
        this.getView().menuBtnLogOut.setVisible(true);
        this.getView().profileFBox.setVisible(false);
        this.getView().crtCntFBox.setVisible(true);
    },
    crtCntBackEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let userMob = oSampModel.getProperty("/loggedin").mobile;
        this.getOwnerComponent().getRouter().navTo("main",{userId: userMob});
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