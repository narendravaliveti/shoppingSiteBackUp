sap.ui.jsview("routing.shoppingrouting.subContent", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf shoppingrouting.subContent
     */
    getControllerName: function () {
        return "routing.shoppingrouting.subContent";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf shoppingrouting.subContent
     */
    createContent: function (oController) {
        let oView = this;
        this.oNFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({maxFractionDigits: 2});
        this.oMenuBtnProfile = new sap.m.MenuItem({
            text: "Profile",
            press: [oController.oProfileEvt, oController]
        });
        this.oMenuBtnLogOut = new sap.m.MenuItem({
            text: "LogOut",
            press: [oController.oLogOutEvt, oController]
        });
        this.oMenuBtn = new sap.m.MenuButton({
            icon: "sap-icon://customer",
            text:
                "{userModel>/loggedin/fname} {userModel>/loggedin/lname}",
            menu:
                new sap.m.Menu({
                    items: [
                        this.oMenuBtnProfile,
                        this.oMenuBtnLogOut
                    ]
                })
        });
        this.oProfileLogOut = new sap.m.Button({
            text: "LogOut",
            width: "40%",
            type: sap.m.ButtonType.Reject,
            press: [oController.oLogOutEvt, oController]
        });
        this.oProfileBack = new sap.m.Button({
            text: "Back",
            width: "40%",
            type: sap.m.ButtonType.Back,
            press: [oController.oProfileBackEvt, oController]
        });
        this.oSubCntBackBtn = new sap.m.Button({
            text: "Back",
            type: sap.m.ButtonType.Back,
            press: [oController.oSubCntBackEvt, oController]
        });
        this.oProfileList = new sap.m.List({
            headerText: "Profile",
            visible: true,
            items: [
                new sap.m.StandardListItem({
                    title: "UserId",
                    description: "{userModel>/loggedin/userid}"
                }),
                new sap.m.StandardListItem({
                    title: "Name",
                    description: {
                        parts: ["userModel>/loggedin/fname", "userModel>/loggedin/lname"],
                        formatter: (fname, lname) => {
                            return fname + " " + lname;
                        }
                    }
                }),
                new sap.m.StandardListItem({
                    title: "Gender",
                    description: "{userModel>/loggedin/gender}"
                }),
                new sap.m.StandardListItem({
                    title: "D.O.B",
                    description: "{userModel>/loggedin/dob}"
                }),
                new sap.m.StandardListItem({
                    title: "Email",
                    description: "{userModel>/loggedin/email}"
                }),
                new sap.m.StandardListItem({
                    title: "Mobile",
                    description: "{userModel>/loggedin/mobile}"
                })
            ]
        }).addStyleClass("textAlignCenter");
        this.oProfileGrid = new sap.ui.layout.Grid({
            defaultSpan: "L12 M12 S12",
            position: sap.ui.layout.GridPosition.Center,
            width: "100%",
            content: [
                this.oProfileList,
                this.oProfileLogOut,
                this.oProfileBack
            ]
        }).addStyleClass("textAlignCenter");
        this.oProfileFBox = new sap.m.FlexBox({
            visible: false,
            justifyContent: sap.m.FlexJustifyContent.Center,
            alignItems: sap.m.FlexAlignItems.Center,
            fitContainer: true,
            items: [
                this.oProfileGrid
            ]
        });
        this.oCartBtn = new sap.m.Button({
            icon: "sap-icon://cart",
            press: [oController.oCrtBtnEvt, oController]
        });
        this.oSubCntFBox = new sap.ui.layout.Grid({
            content: {
                path: "userModel>items",
                factory: (sIdx, oContext) => {
                    return new sap.m.FlexBox({
                        height: "380px",
                        width: "300px",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        alignItems: sap.m.FlexAlignItems.Center,
                        direction: sap.m.FlexDirection.Column,
                        visible : {
                            parts: ["userModel>/loggedin/role", "userModel>switchstatus"],
                            formatter: (role, switchState) => {

                                if( role === "admin"){
                                    return true;
                                }else if( role === "user"){
                                    return switchState;
                                }
                            }
                        },
                        items: [
                            new sap.m.Switch({
                                state: "{userModel>switchstatus}",
                                visible: {
                                    path: "userModel>/loggedin/role",
                                    formatter: (role) => {
                                        if( role === "admin" ){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    }
                                }
                            }),
                            new sap.m.Image({
                                height: "200px",
                                width: "{userModel>width}",
                                src: "{userModel>src}",
                                press: [oController.oProImgEvt,oController]
                            }),
                            new sap.m.Title({
                                text: "{userModel>title}"
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
                                        let val = oView.oNFormat.format(sValue, oView.oNFormat.oLocaleData.getCurrencySymbol("INR"));
                                        return val;
                                    }
                                }
                            }),
                            new sap.m.Button({
                                text: "Add To Cart",
                                type: sap.m.ButtonType.Emphasized,
                                press: [oController.oAddCrtBtn, oController]
                            })
                        ],
                        // press: (oEvnt) => {
                        //     var oBinding = oEvnt.getSource().getBinding("header").getContext();
                        //     this.shoppingSubTiles.bindElement(`userModel>${oBinding.getPath()}`);
                        // }
                    }).addStyleClass("sapUiSmallMargin");
                }

            }

        });
        return new sap.m.Page({
            customHeader: new sap.m.Bar({
                contentMiddle: [new sap.m.Label({
                    text: "My App"
                })],
                contentRight: [
                    this.oCartBtn
                ]
            }),
            subHeader: new sap.m.Bar({
                contentLeft: [
                    this.oSubCntBackBtn
                ],
                contentRight: [
                    this.oMenuBtn
                ]
            }),
            content: [
                this.oProfileFBox,
                this.oSubCntFBox
            ]
        });
    }

});