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
                    "pattern": "sub/{userId}/{ctgryId}",
                    "name": "sub",
                    "target": "subTarget"
                },
                {
                    "pattern": "cart/{userId}",
                    "name": "cart",
                    "target": "cartTarget"
                },
                {
                    // "pattern": "pro/{userId}/{ctgryId}/{prdtId}",
                    "pattern": "pro",
                    "name": "pro",
                    "target": "proTarget"
                },
                {
                    "pattern": "proEdit",
                    "name": "proEdit",
                    "target": "proEditTarget"
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
                },
                "proTarget": {
                    "viewName": "productcontent"
                },
                "proEditTarget": {
                    "viewName": "productedit"
                }
            }
        }
    },
    init: function () {
        this.oModel = new sap.ui.model.json.JSONModel("shoppingrouting/model.json");
        this.setModel(this.oModel, "userModel");
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();


      /*  $.ajax({ url: "http://gicomsap16.gicom.local:8000/gicom/jsonhandler"},
                 success: function f(oResponse){

                 },
                 error: function f(oError) {
                 }
        });*/
        // let oOptions = {
        //     "IvUserid": "9999",
        //     "IvPassword": "9999"
        // };
        // debugger
        // this.callServer(oOptions).then((oResponse)=>{
        //         debugger;
        //     });
        // let oOptions = {
        //     "IvUserid": "9999",
        //     "IvPassword": "9999"
        // };
        // debugger
        // $.ajax({ url: "http://gicomsap16.gicom.local:8000/gicom/jsonhandler/Z03_API_LOGIN?format=json&case=C&sap-client=100&sap-user=kanchus&sap-password=gicom2$",
        //          data: oOptions,
        //          success: function (oResponse) {
        //             debugger;
        //          },
        //          error: function (oError) {
        //             debugger
        //          }});
    },

    callServer:(oOptions,sAPIName)=>{
        debugger;
        let oConfig = {
            url: `http://gicomsap16.gicom.local:8000/gicom/jsonhandler/${sAPIName}?format=json&case=C&sap-client=100&sap-user=kanchus&sap-password=gicom2$`,
            method: "POST",
            data:JSON.stringify(oOptions) ,
            dataType: "json",
            contentType: "text/plain"

        };

        let oDeferred = jQuery.Deferred();

        jQuery.ajax(oConfig).done(function(response, status, xhr, cfg) {

            oDeferred.resolve(response);
        })
            .fail(function(response, status, xhr, cfg)  {

                oDeferred.reject(response);
            })
            .always(function(response, status, xhr, cfg) {

                sap.ui.core.BusyIndicator.hide();
            });

        return oDeferred.promise();
    }
});