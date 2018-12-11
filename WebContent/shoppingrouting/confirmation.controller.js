sap.ui.controller("routing.shoppingrouting.confirmation", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf shoppingrouting.confirmation
*/
//	onInit: function() {
//
//	},
    oLogInTileEvt() {
        this.getView().oLogInTile.setVisible(false);
        this.getView().oSignUpTile.setVisible(false);
        this.getView().oLogInGrid.setVisible(true);
    },
    oSignUpTileEvt() {
        this.getView().oLogInTile.setVisible(false);
        this.getView().oSignUpTile.setVisible(false);
        this.getView().oSignUpGrid.setVisible(true);
    },
    oLogInSbmtEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let oLForm = oSampModel.getProperty("/loginform");
        let arSUser = oSampModel.getProperty("/signedup");
        let oLUser = oSampModel.getProperty("/loggedin");
        for (let i = 0; i < arSUser.length; i++) {
             if (oLForm.password === arSUser[i].password && oLForm.userid === arSUser[i].userid) {
        //         if(arSUser[i].role === "admin") {
        //             var arCtgry = this.getOwnerComponent().getModel("userModel").getProperty("/img/category");
        //             arCtgry.forEach((oCnt)=>{
        //                 oCnt.switchvisible = true;
        //                 oCnt.ctgrystatus = true});
        //             this.getOwnerComponent().getModel("userModel").setProperty("/img/category",arCtgry);
        //         }else{
        //             var arCtgry = this.getOwnerComponent().getModel("userModel").getProperty("/img/category");
        //             arCtgry.forEach((oCnt)=>{
        //                 oCnt.switchvisible = false;
        //                 if(oCnt.switchstatus === true) {
        //                     oCnt.ctgrystatus = true
        //                 }else{
        //                     oCnt.ctgrystatus = false
        //                 }
        //             });
        //             this.getOwnerComponent().getModel("userModel").setProperty("/img/category",arCtgry);
        //         }
                oLUser = JSON.parse(JSON.stringify(arSUser[i]));
                oLForm.userid = "";
                oLForm.password = "";
//			oSampModel.setData(oSampModel.getData());
                oSampModel.setProperty("/loggedin", oLUser);
                let userId = oSampModel.getProperty("/loggedin").userid;
                this.getOwnerComponent().getRouter().navTo("main",{userId: userId});
                this.getView().oLogInTile.setVisible(true);
                this.getView().oSignUpTile.setVisible(true);
                this.getView().oLogInGrid.setVisible(false);
                break;
            }
        }
    },
    oSignUpSbmtEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let arSUser = oSampModel.getProperty("/signedup");
        let oSForm = oSampModel.getProperty("/signupform");
        let arCart = oSampModel.getProperty("/cart");
        let oUserCart = {};
        oSForm.role="user";
        arSUser.push(JSON.parse(JSON.stringify(oSForm)));
        oUserCart.userid = oSForm.userid;
        oUserCart.products = [];
        arCart.push(JSON.parse(JSON.stringify(oUserCart)));
        oSForm.fname = "";
        oSForm.lname = "";
        oSForm.gender = "";
        oSForm.dob = "";
        oSForm.email = "";
        oSForm.mobile = "";
        oSForm.userid = ""
        oSForm.password = "";
        oSampModel.setProperty("/signupform", oSForm);
        this.getView().oLogInTile.setVisible(true);
        this.getView().oSignUpTile.setVisible(true);
        this.getView().oSignUpGrid.setVisible(false);
    },
    oLogInCnclEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let oLForm = oSampModel.getProperty("/loginform");
        oLForm.userid = "";
        oLForm.password = "";
        oSampModel.setProperty("/loginform", oLForm);
        this.getView().oLogInTile.setVisible(true);
        this.getView().oSignUpTile.setVisible(true);
        this.getView().oLogInGrid.setVisible(false);
    }
    ,
    oSignUpCnclEvt() {
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let oSForm = oSampModel.getProperty("/signupform");
        oSForm.fname = "";
        oSForm.lname = "";
        oSForm.gender = "";
        oSForm.dob = "";
        oSForm.email = "";
        oSForm.mobile = "";
        oSForm.userid = "";
        oSForm.password = "";
        oSampModel.setProperty("/signupform", oSForm);
        this.getView().oLogInTile.setVisible(true);
        this.getView().oSignUpTile.setVisible(true);
        this.getView().oSignUpGrid.setVisible(false);
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