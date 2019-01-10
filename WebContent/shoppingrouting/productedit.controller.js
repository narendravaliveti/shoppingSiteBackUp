sap.ui.controller("routing.shoppingrouting.productedit", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf routing.shoppingrouting.productedit
*/
//	onInit: function() {
//
//	},
    oUploadImage(oEvnt) {
        this.oView.oImgUploadPop.openBy(oEvnt.getSource());
    },
    oImgChangeEvt(oEvent) {
        debugger
        oController = this;
        let oUserModel = oController.getOwnerComponent().getModel("userModel");
        let oSource = oEvent.getSource();
        if (oSource) {
            var oFile = oEvent.getParameter("files")[0];
            oUserModel.setProperty("/ImgSrc", oFile);
            oSource.upload();
        }
    },
    oImgUploadEvt(oEvent) {
        oController = this;
        let oUserModel = oController.getOwnerComponent().getModel("userModel");
        var oFile = oUserModel.getProperty("/ImgSrc");
        this.oView.oImgUploadPop.close();
        if (oFile) {
            let oReader = new FileReader();
            oReader.onload = function (oEvent) {
                let sBufferData = oEvent.target.result;
                oUserModel.setProperty("/ProductForm/ImgSrc", sBufferData);
            };
            oReader.readAsDataURL(oFile);
        }
    },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf routing.shoppingrouting.productedit
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf routing.shoppingrouting.productedit
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf routing.shoppingrouting.productedit
*/
//	onExit: function() {
//
//	}

});