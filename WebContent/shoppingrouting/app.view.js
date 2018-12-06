sap.ui.jsview("routing.shoppingrouting.app", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf routing.shoppingrouting.app
     */
    getControllerName: function () {
        return "routing.shoppingrouting.app";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf routing.shoppingrouting.app
     */
    createContent: function (oController) {
        return new sap.m.App("rootView", {});
    }

});