sap.ui.jsview("routing.shoppingrouting.cart", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf routing.shoppingrouting.cart
     */
    getControllerName: function () {
        return "routing.shoppingrouting.cart";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf routing.shoppingrouting.cart
     */
    createContent: function (oController) {
        let oView = this;
        oView.NFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({maxFractionDigits: 2});
        this.menuBtnProfile = new sap.m.MenuItem({
            text: "Profile",
            press: [oController.profileEvt, oController]
        });
        this.menuBtnLogOut = new sap.m.MenuItem({
            text: "LogOut",
            press: [oController.logOutEvt, oController]
        });
        this.menuBtn = new sap.m.MenuButton({
            icon: "sap-icon://customer",
            text:
                "{userModel>/loggedin/fname} {userModel>/loggedin/lname}",
            menu:
                new sap.m.Menu({
                    items: [
                        this.menuBtnProfile,
                        this.menuBtnLogOut
                    ]
                })
        });
        this.profileLogOut = new sap.m.Button({
            text: "LogOut",
            width: "40%",
            type: sap.m.ButtonType.Reject,
            press: [oController.logOutEvt, oController]
        });
        this.profileBack = new sap.m.Button({
            text: "Back",
            width: "40%",
            type: sap.m.ButtonType.Back,
            press: [oController.profileBackEvt, oController]
        });
        this.crtCntBackBtn = new sap.m.Button({
            text: "Back",
            type: sap.m.ButtonType.Back,
            press: [oController.crtCntBackEvt, oController]
        });
        this.profileList = new sap.m.List({
            headerText: "Profile",
            visible: true,
            items: [
                new sap.m.StandardListItem({
                    title: "Name",
                    description: {
                        parts: ["userModel>/profileList/fname", "userModel>/profileList/lname"],
                        formatter: (fname, lname) => {
                            return fname + " " + lname;
                        }
                    }
                }),
                new sap.m.StandardListItem({
                    title: "D.O.B",
                    description: "{userModel>/profileList/dob}"
                }),
                new sap.m.StandardListItem({
                    title: "Email",
                    description: "{userModel>/profileList/email}"
                }),
                new sap.m.StandardListItem({
                    title: "Mobile",
                    description: "{userModel>/profileList/mobile}"
                })
            ]
        }).addStyleClass("textAlignCenter");
        this.profileGrid = new sap.ui.layout.Grid({
            defaultSpan: "L12 M12 S12",
            position: sap.ui.layout.GridPosition.Center,
            width: "100%",
            content: [
                this.profileList,
                this.profileLogOut,
                this.profileBack
            ]
        }).addStyleClass("textAlignCenter");
        this.profileFBox = new sap.m.FlexBox({
            visible: false,
            justifyContent: sap.m.FlexJustifyContent.Center,
            alignItems: sap.m.FlexAlignItems.Center,
            fitContainer: true,
            items: [
                this.profileGrid
            ]
        });
        this.crtCntFBox = new sap.ui.layout.Grid({
            content: {
                path: "userModel>products",
                factory: (sIdx, oContext) => {
                    return new sap.m.FlexBox({
                        height: "380px",
                        width: "300px",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        alignItems: sap.m.FlexAlignItems.Center,
                        direction: sap.m.FlexDirection.Column,
                        items: [
                            new sap.m.Image({
                                height: "200px",
                                width: "200px",
                                src: "{userModel>loc}"
                            }),
                            new sap.m.Title({
                                text: "{userModel>id}"
                            }),
                            new sap.m.DisplayListItem({
                                label: "Model",
                                value: "{userModel>model}"
                            }),
                            new sap.m.DisplayListItem({
                                label: "Price",
                                value: {
                                    path: "userModel>price",
                                    formatter: (sValue) => {
                                        let val = oView.NFormat.format(sValue, oView.NFormat.oLocaleData.getCurrencySymbol("INR"));
                                        return val;
                                    }
                                }
                            })
                        ]
                    })
                }
            }
        }).addStyleClass("sapUiSmallMargin");
        return new sap.m.Page({
            title: "Cart",
            subHeader: new sap.m.Bar({
                contentLeft: [
                    this.crtCntBackBtn
                ],
                contentMiddle: [
                    new sap.m.Title({
                        text: "{userModel>/loggedin/fname} {userModel>/loggedin/lname}"
                    })
                ],
                contentRight: [
                    this.menuBtn
                ]
            }),
            content: [
                this.profileFBox,
                this.crtCntFBox
            ]
        });
    }

});