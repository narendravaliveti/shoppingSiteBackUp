sap.ui.controller("routing.shoppingrouting.confirmation", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf shoppingrouting.confirmation
*/
//	onInit: function() {
//
//	},
    logInTileEvt() {
        this.getView().logInTile.setVisible(false);
        this.getView().signUpTile.setVisible(false);
        this.getView().logInGrid.setVisible(true);
    },
    signUpTileEvt() {
        this.getView().logInTile.setVisible(false);
        this.getView().signUpTile.setVisible(false);
        this.getView().signUpGrid.setVisible(true);
    },
    logInSbmtEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let lForm = oSampModel.getProperty("/loginform");
        let sUser = oSampModel.getProperty("/signedup");
        let lUser = oSampModel.getProperty("/loggedin");
        let pUser = oSampModel.getProperty("/profileList");
        for (let i = 0; i < sUser.length; i++) {
            if (lForm.password === sUser[i].password && (lForm.username === sUser[i].mobile || sUser[i].email === lForm.username)) {
                lUser = JSON.parse(JSON.stringify(sUser[i]));
                lForm.username = "";
                lForm.password = "";
                pUser.fname = sUser[i].fname;
                pUser.lname = sUser[i].lname;
                pUser.dob = sUser[i].dob;
                pUser.email = sUser[i].email;
                pUser.mobile = sUser[i].mobile;
//			oSampModel.setData(oSampModel.getData());
                oSampModel.setProperty("/loggedin", lUser);
                let userMob = oSampModel.getProperty("/loggedin").mobile;
                this.getOwnerComponent().getRouter().navTo("main",{userId: userMob});
                this.getView().logInTile.setVisible(true);
                this.getView().signUpTile.setVisible(true);
                this.getView().logInGrid.setVisible(false);
                break;
            }
        }
    },
    signUpSbmtEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let sUser = oSampModel.getProperty("/signedup");
        let sForm = oSampModel.getProperty("/signupform");
        let cart = oSampModel.getProperty("/cart");
        let userCart = {};
        sUser.push(JSON.parse(JSON.stringify(sForm)));
        userCart.mobile = sForm.mobile;
        userCart.email = sForm.email;
        userCart.products = [];
        cart.push(JSON.parse(JSON.stringify(userCart)));
        sForm.fname = "";
        sForm.lname = "";
        sForm.dob = "";
        sForm.email = "";
        sForm.mobile = "";
        sForm.password = "";
        oSampModel.setProperty("/signupform", sForm);
        this.getView().logInTile.setVisible(true);
        this.getView().signUpTile.setVisible(true);
        this.getView().signUpGrid.setVisible(false);
        this.getView().logAndSignFBox.setVisible(true);
    },
    logInCnclEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let lForm = oSampModel.getProperty("/loginform");
        lForm.username = "";
        lForm.password = "";
        oSampModel.setProperty("/loginform", lForm);
        this.getView().logInTile.setVisible(true);
        this.getView().signUpTile.setVisible(true);
        this.getView().logInGrid.setVisible(false);
    }
    ,
    signUpCnclEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let sForm = oSampModel.getProperty("/signupform");
        sForm.fname = "";
        sForm.lname = "";
        sForm.dob = "";
        sForm.email = "";
        sForm.mobile = "";
        sForm.password = "";
        oSampModel.setProperty("/signupform", sForm);
        this.getView().logInTile.setVisible(true);
        this.getView().signUpTile.setVisible(true);
        this.getView().signUpGrid.setVisible(false);
    }
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf shoppingrouting.confirmation
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf shoppingrouting.confirmation
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf shoppingrouting.confirmation
*/
//	onExit: function() {
//
//	}

});