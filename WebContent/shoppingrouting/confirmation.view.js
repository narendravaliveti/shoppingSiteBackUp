sap.ui.jsview("routing.shoppingrouting.confirmation", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf routing.shoppingrouting.confirmation
     */
    getControllerName: function () {
        return "routing.shoppingrouting.confirmation";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf routing.shoppingrouting.confirmation
     */
    createContent: function (oController) {
        let oView = this;
        this.logInTile = new sap.m.GenericTile({
            header: "LogIn",
            backgroundImage: "shoppingrouting/images/tile.jpg",
            tileContent: new sap.m.TileContent({
                content: [
                    new sap.m.ImageContent({
                        src: "shoppingrouting/images/login1.jpg"
                    })
                ]
            }),
            press: [oController.logInTileEvt, oController]
        }).addStyleClass("sapUiSmallMarginEnd");
        this.signUpTile = new sap.m.GenericTile({
            header: "SignUp",
            backgroundImage: "shoppingrouting/images/tile.jpg",
            tileContent: new sap.m.TileContent({
                content: [
                    new sap.m.ImageContent({
                        src: "shoppingrouting/images/signup1.jpg"
                    })
                ]
            }),
            press: [oController.signUpTileEvt, oController]
        });
        this.logInForm = new sap.ui.layout.form.Form({
            title: "LogIn",
            width: "100%",
            layout: new sap.ui.layout.form.FormLayout({}),
            formContainers: new sap.ui.layout.form.FormContainer({
                formElements: new sap.ui.layout.form.FormElement({
                    fields: [
                        new sap.m.Input({
                            placeholder: "Mobile/Email",
                            textAlign: sap.ui.core.TextAlign.Center,
                            value: "{userModel>/loginform/username}"
                        }),
                        new sap.m.Input({
                            placeholder: "Password",
                            textAlign: sap.ui.core.TextAlign.Center,
                            value: "{userModel>/loginform/password}",
                            type: sap.m.InputType.Password
                        }),
                        new sap.m.Button({
                            text: "Submit",
                            width: "40%",
                            type: sap.m.ButtonType.Accept,
                            press: [oController.logInSbmtEvt, oController]
                        }),
                        new sap.m.Button({
                            text: "Cancel",
                            width: "40%",
                            type: sap.m.ButtonType.Reject,
                            press: [oController.logInCnclEvt, oController]
                        })
                    ]
                })
            })
        }).addStyleClass("textAlignCenter");
        this.signUpForm = new sap.ui.layout.form.Form({
            title: "SignUp",
            width: "100%",
            layout: new sap.ui.layout.form.FormLayout({}),
            formContainers: new sap.ui.layout.form.FormContainer({
                formElements: new sap.ui.layout.form.FormElement({
                    fields: [
                        new sap.m.Input({
                            placeholder: "FirstName",
                            textAlign: sap.ui.core.TextAlign.Center,
                            value: "{userModel>/signupform/fname}",
                        }),
                        new sap.m.Input({
                            placeholder: "LastName",
                            textAlign: sap.ui.core.TextAlign.Center,
                            value: "{userModel>/signupform/lname}",
                        }),
                        new sap.m.DatePicker({
                            placeholder: "Date Of Birth",
                            textAlign: sap.ui.core.TextAlign.Center,
                            value: "{userModel>/signupform/dob}"
                        }),
                        new sap.m.Input({
                            placeholder: "Email",
                            textAlign: sap.ui.core.TextAlign.Center,
                            value: "{userModel>/signupform/email}"
                        }),
                        new sap.m.Input({
                            placeholder: "Mobile",
                            textAlign: sap.ui.core.TextAlign.Center,
                            value: "{userModel>/signupform/mobile}",
                            type: sap.m.InputType.Number
                        }),
                        new sap.m.Input({
                            placeholder: "Password",
                            textAlign: sap.ui.core.TextAlign.Center,
                            value: "{userModel>/signupform/password}",
                            type: sap.m.InputType.Password
                        }),
                        new sap.m.Button({
                            text: "Submit",
                            width: "40%",
                            type: sap.m.ButtonType.Accept,
                            press: [oController.signUpSbmtEvt, oController]
                        }),
                        new sap.m.Button({
                            text: "Cancel",
                            width: "40%",
                            type: sap.m.ButtonType.Reject,
                            press: [oController.signUpCnclEvt, oController]
                        })
                    ]
                })
            })
        }).addStyleClass("textAlignCenter");
        this.logInGrid = new sap.ui.layout.Grid({
            visible: false,
            defaultSpan: "L12 M12 S12",
            position: sap.ui.layout.GridPosition.Center,
            width: "80%",
            content: [
                this.logInForm,
            ]
        });
        this.signUpGrid = new sap.ui.layout.Grid({
            visible: false,
            defaultSpan: "L12 M12 S12",
            position: sap.ui.layout.GridPosition.Center,
            width: "40%",
            content: [
                this.signUpForm,
            ]
        });
        this.logAndSignFBox = new sap.m.FlexBox({
            justifyContent: sap.m.FlexJustifyContent.Center,
            alignItems: sap.m.FlexAlignItems.Center,
            fitContainer: true,
            items: [
                this.logInTile,
                this.signUpTile,
                this.logInGrid,
                this.signUpGrid
            ]
        });
        return new sap.m.Page({
            customHeader: new sap.m.Bar({
                contentMiddle: [new sap.m.Label({
                    text: "My App"
                })],
            }),
            content: [
                this.logAndSignFBox
            ],
        });
    }

});