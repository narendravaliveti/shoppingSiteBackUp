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
        this.oCtgryList = new sap.m.FlexBox({
            visible: false,
            width: "30%",
            direction: sap.m.FlexDirection.Column,
            items: [
                new sap.m.Bar({
                    contentMiddle: [
                        new sap.m.Title({
                            text: "Category"
                        })
                    ],
                    contentRight: [
                        new sap.m.Button({
                            icon: "sap-icon://edit",
                            visible: "{= ${userModel>/loggedin/Role} === 'ADMIN' && ${userModel>/Visible/CtgryEdit} === ''}",
                            press: [oController.oOpenEdit, oController]
                        }),
                        new sap.m.Button({
                            icon: "sap-icon://decline",
                            visible: "{= ${userModel>/loggedin/Role} === 'ADMIN' && ${userModel>/Visible/CtgryEdit} === 'X'}",
                            press: [oController.oCloseEdit, oController]
                        })
                    ]
                }),
                new sap.m.VBox({
                    items: {
                        path: "userModel>/category",
                        factory: (sIdx, oContext) => {
                            return new sap.m.ObjectListItem({
                                title: "{userModel>Title}",
                                type: sap.m.ListType.Active,
                                press: [oController.oSlctCtgry, oController],
                                firstStatus: new sap.m.ObjectStatus({
                                    icon: "sap-icon://edit",
                                    active: true,
                                    visible: "{= ${userModel>/Visible/CtgryEdit} === 'X'}",
                                    press: [oController.oEditCtgry, oController]
                                })
                            })
                        }
                    }
                })
            ]
        });
        this.oAcntPop = new sap.m.Popover({
            placement: sap.m.PlacementType.Bottom,
            showHeader: false,
            content: [
                new sap.m.FlexBox({
                    direction: sap.m.FlexDirection.Column,
                    items: [
                        new sap.m.ObjectListItem({
                            title: "Profile",
                            type: sap.m.ListType.Active
                        }),
                        new sap.m.ObjectListItem({
                            title: "Cart",
                            type: sap.m.ListType.Active
                        }),
                        new sap.m.ObjectListItem({
                            title: "LogOut",
                            type: sap.m.ListType.Active
                        })
                    ]
                })
            ]
        });
        this.oPrdtCntFBox = new sap.ui.layout.Grid({
            visible: true,
            defaultSpan: "L3 M12 S12",
            hSpacing: 1,
            content: {
                path: "userModel>/Products",
                factory: (sIdx, oContext) => {
                    return new sap.ui.layout.Grid({
                        defaultSpan: "L12 M12 S12",
                        content: [
                                    new sap.ui.layout.VerticalLayout({
                                        content: [
                                            new sap.m.ObjectIdentifier({
                                                title: "{userModel>Title}"
                                            })
                                        ]
                                    }).addStyleClass("sapUiSmallMargin"),
                                    new sap.m.FlexBox({
                                        renderType: sap.m.FlexRendertype.Bare,
                                        justifyContent: sap.m.FlexJustifyContent.Center,
                                       items: [
                                           new sap.m.Image({
                                               height: "120px",
                                               width: "180px",
                                               src: "shoppingrouting/images/laptop.jpg"
                                           })
                                       ]
                                    }),
                                    new sap.m.Button({
                                        icon: "sap-icon://cart-3",
                                        type: sap.m.ButtonType.Emphasized,
                                        layoutData: new sap.ui.layout.GridData({
                                            span: "XL4 L4 M4 S4"
                                        })
                                    }),
                                    new sap.m.ObjectListItem({
                                        number: "45000",
                                        numberUnit: "INR",
                                        layoutData: new sap.ui.layout.GridData({
                                            span: "XL8 L8 M8 S8"
                                        })
                                    })
                        ]
                    }).addStyleClass("background");
                }
            }

        }).addStyleClass("sapUiSmallMargin");
        this.oPrdtFBox = new sap.m.FlexBox({
            items: [
                this.oCtgryList,
                new sap.m.FlexBox({
                    height: "100%",
                    width: "100%",
                    direction: sap.m.FlexDirection.Column,
                    items: [
                        this.oPrdtCntFBox
                    ]
                }),
            ]
        });
        return new sap.m.Page({
            customHeader: new sap.m.Bar({
                contentLeft: [
                    new sap.m.Button({
                        icon: "sap-icon://home",
                        type: sap.m.ButtonType.Emphasized,
                        press: [oController.oListBtn, oController]
                    })
                ],
                contentRight: [
                    new sap.m.ToggleButton({
                        pressed: true,
                        icon: "sap-icon://customer",
                        text: "{userModel>/loggedin/Fname} {userModel>/loggedin/Lname}",
                        press: [oController.oAcntOpen, oController]
                    }),
                ]
            }),
            subHeader: new sap.m.Bar({
                contentLeft: [
                    new sap.m.Label({
                        text: "Category"
                    }),
                    new sap.m.Select({
                        forceSelection: false,
                        items: {
                            path: "userModel>/category",
                            factory: ()=>{
                                return new sap.ui.core.Item({
                                    text: "{userModel>Title}"
                                })
                            }
                        }
                    })
                ],
                contentMiddle: [
                    // new sap.m.Text({
                    //     text: "Home/{userModel>/category/0/Title}"
                    // })
                ],
                contentRight: [

                ]
            }),
            content: [
                // new sap.ui.comp.filterbar.FilterBar({
                //     filterGroupItems: new sap.ui.comp.filterbar.FilterGroupItem({
                //         name: "Category",
                //         groupName: "Category",
                //         control: new sap.m.Select({
                //             items: {
                //                 path: "userModel>/category",
                //                 factory: ()=> {
                //                    return new sap.m.Label({
                //                         text: "{userModel>Title}"
                //                     })
                //                 }
                //             }
                //         })
                //     })
                // }),
                this.oPrdtFBox
            ]
        });
    }

});