sap.ui.controller("routing.shoppingrouting.confirmation", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf shoppingrouting.confirmation
     */
	onInit: function() {
        let oRouter = this.getOwnerComponent().getRouter();
        debugger;
        oRouter.attachRouteMatched("logIn", (oEvnt) => {
            debugger
            if (oEvnt.getParameter("name") === "logIn") {
                debugger
            }
        });
	},
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
        let oController = this;
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let oLForm = oSampModel.getProperty("/loginform");
        let oOptions = {
            "IvUserid": oLForm.userid,
            "IvPassword": oLForm.password
        };
        debugger;
        $.ajax({
            url: "http://gicomsap16.gicom.local:8000/gicom/jsonhandler/Z03_API_LOGIN?format=json&case=C&sap-client=100&sap-user=kanchus&sap-password=gicom2$",
            data: oOptions,
            success: (oResponse)=>{
                debugger;
                if(oResponse.EvMsg === "SUCCESS") {
                    let userId = oSampModel.getProperty("/loginform").userid;
                    this.getOwnerComponent().getRouter().navTo("main", {userId: userId});
                    this.getView().oLogInTile.setVisible(true);
                    this.getView().oSignUpTile.setVisible(true);
                    this.getView().oLogInGrid.setVisible(false);
                    oLForm.userid = "";
                    oLForm.password = "";
                }
            },
            error: (oResponse) => {
                debugger
            }
        });
//         for (let i = 0; i < arSUser.length; i++) {
//              if (oLForm.password === arSUser[i].password && oLForm.userid === arSUser[i].userid) {
//         //         if(arSUser[i].role === "admin") {
//         //             var arCtgry = this.getOwnerComponent().getModel("userModel").getProperty("/img/category");
//         //             arCtgry.forEach((oCnt)=>{
//         //                 oCnt.switchvisible = true;
//         //                 oCnt.ctgrystatus = true});
//         //             this.getOwnerComponent().getModel("userModel").setProperty("/img/category",arCtgry);
//         //         }else{
//         //             var arCtgry = this.getOwnerComponent().getModel("userModel").getProperty("/img/category");
//         //             arCtgry.forEach((oCnt)=>{
//         //                 oCnt.switchvisible = false;
//         //                 if(oCnt.switchstatus === true) {
//         //                     oCnt.ctgrystatus = true
//         //                 }else{
//         //                     oCnt.ctgrystatus = false
//         //                 }
//         //             });
//         //             this.getOwnerComponent().getModel("userModel").setProperty("/img/category",arCtgry);
//         //         }
//                 oLUser = JSON.parse(JSON.stringify(arSUser[i]));
// //			oSampModel.setData(oSampModel.getData());
//                 oSampModel.setProperty("/loggedin", oLUser);
//                 break;
//             }
//         }
    },
    oSignUpSbmtEvt() {
        debugger;
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let arSUser = oSampModel.getProperty("/signedup");
        let oSForm = oSampModel.getProperty("/signupform");
        oSForm.Role = "user";
        let oOptions = {
            "IsSignup":oSForm
        };
        debugger;
        this.getOwnerComponent().callServer(oOptions,"Z03_API_SIGNUP").then((oResponse)=>{
           debugger;
            oSForm = {};
            oSampModel.setProperty("/signupform", oSForm);
            this.getView().oLogInTile.setVisible(true);
            this.getView().oSignUpTile.setVisible(true);
            this.getView().oSignUpGrid.setVisible(false);
        });
        // $.ajax({
        //     url: "http://gicomsap16.gicom.local:8000/gicom/jsonhandler/Z03_API_SIGNUP?format=json&case=C&sap-client=100&sap-user=kanchus&sap-password=gicom2$",
        //     data: JSON.stringify(oOptions),
        //     success: (oResponse)=>{
        //         debugger;
        //     },
        //     error: (oResponse) => {
        //         debugger
        //     }});
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