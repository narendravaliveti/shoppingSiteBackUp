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
                let bindPath = this.getOwnerComponent().getModel("userModel").getProperty("/bindpath");
                if (bindPath) {
                    this.getView().subCntFBox.bindElement(bindPath);
                }
            }
        });

    },
    crtBtnEvt: function () {
        let oRoute = this.getOwnerComponent().getRouter();
         oRoute.navTo("cart");
    },
    profileEvt() {
        this.getView().menuBtnProfile.setVisible(false);
        this.getView().menuBtnLogOut.setVisible(false);
        this.getView().subCntFBox.setVisible(false);
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
        this.getView().subCntFBox.setVisible(true);
    },
    subCntBackEvt() {
        this.getOwnerComponent().getRouter().navTo("main");
    },
    addCrtBtn: function (oEvnt) {
        let crtData = oEvnt.getSource().getParent().getBindingContext("userModel").getObject();
        let oSampModel = this.getOwnerComponent().getModel("userModel");
        let lUser = oSampModel.getProperty("/loggedin");
        let cart = oSampModel.getProperty("/cart");
        debugger
        // for (let i = 0; i < cart.length; i++) {
        //     debugger
        //     if (lUser.mobile !== "" && lUser.mobile === cart[i].mobile) {
        //         debugger
        //         cart[i].products.push(JSON.parse(JSON.stringify(crtData)));
        //         debugger
        //     }
        // }
        cart.forEach((oCrt)=>{
            if(lUser.mobile !== "" && lUser.mobile === oCrt.mobile){
                oCrt.products.push(JSON.parse(JSON.stringify(crtData)));
            }
        });
        oSampModel.setProperty("/cart", cart);
    },
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