sap.ui.core.UIComponent.extend("routing.Component", {
    metadata: {
        "rootView": {
            "viewName": "routing.shoppingrouting.app",
            "type": "JS"
        },
        "routing": {
            "config": {
                "routerClass": "sap.m.routing.Router",
                "viewType": "JS",
                "viewPath": "routing.shoppingrouting",
                "controlId": "rootView",
                "controlAggregation": "pages",
                "async": true
            },
            "routes": [
                {
                    "pattern": "",
                    "name": "logIn",
                    "target": "logInTarget"
                },
                {
                    "pattern": "main/{userId}",
                    "name": "main",
                    "target": "mainTarget"
                },
                {
                    "pattern": "sub",
                    "name": "sub",
                    "target": "subTarget"
                },
                {
                    "pattern": "cart",
                    "name": "cart",
                    "target": "cartTarget"
                }
            ],
            "targets": {
                "logInTarget": {
                    "viewName": "confirmation"
                },
                "mainTarget": {
                    "viewName": "mainContent"
                },
                "subTarget": {
                    "viewName": "subContent"
                },
                "cartTarget": {
                    "viewName": "cart"
                }
            }
        }
    },
    init: function () {
        this.oModel = new sap.ui.model.json.JSONModel("shoppingrouting/model.json");
        this.setModel(this.oModel, "userModel");
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
    }
});