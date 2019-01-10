sap.ui.jsview("routing.shoppingrouting.productcontent", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf routing.shoppingrouting.productcontent
	*/ 
	getControllerName : function() {
		return "routing.shoppingrouting.productcontent";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf routing.shoppingrouting.productcontent
	*/
    createContent: function (oController) {
        let oView = this;

        return new sap.m.Page({
            content: [

            ]
        });
	}

});