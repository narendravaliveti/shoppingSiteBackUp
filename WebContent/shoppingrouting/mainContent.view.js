sap.ui.jsview("routing.shoppingrouting.mainContent", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf shoppingrouting.mainContent
     */
    getControllerName: function () {

        return "routing.shoppingrouting.mainContent";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf shoppingrouting.mainContent
     */
    createContent: function (oController) {
        let oView = this;
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
        this.oMainCntFBox = new sap.m.FlexBox({
            justifyContent: sap.m.FlexJustifyContent.Center,
            alignItems: sap.m.FlexAlignItems.Center,
            renderType: sap.m.FlexRendertype.Bare,
            fitContainer: true,
            items: {
                path: "userModel>/img/category",
                factory: (sIdx, oContext) => {
                    // return new sap.m.GenericTile({
                    //     header: "{userModel>title}",
                    //     backgroundImage: "shoppingrouting/images/tile.jpg",
                    //     tileContent: [
                    //         new sap.m.TileContent({
                    //             content: [
                    //                 new sap.m.ImageContent({
                    //                     src: "{userModel>src}"
                    //                 })
                    //             ]
                    //         }),
                    //     ],
                    //     press: [oController.oMainTileEvt, oController]
                    //     // press: (oEvnt) => {
                    //     //     var oBinding = oEvnt.getSource().getBinding("header").getContext();
                    //     //     this.subCntFBox.bindElement(`userModel>${oBinding.getPath()}`);
                    //     // }
                    // }).addStyleClass("sapUiSmallMarginEnd");
                    return new sap.m.FlexBox({
                        backgroundDesign: sap.m.BackgroundDesign.Solid,
                        direction: sap.m.FlexDirection.Column,
                        alignItems: sap.m.FlexAlignItems.Center,
                        alignContent: sap.m.FlexAlignContent.Center,
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
                            new sap.m.GenericTile({
                                header: "{userModel>title}",
                                backgroundImage: "shoppingrouting/images/tile.jpg",
                                tileContent: new sap.m.TileContent({
                                    content: [
                                        new sap.m.ImageContent({
                                            src: "{userModel>src}"
                                        })
                                    ]
                                }),
                                press: [oController.oMainTileEvt,oController]
                            })
                            // new sap.m.ObjectHeader({
                            //     title: "{userModel>title}",
                            //     backgroundDesign: sap.m.BackgroundDesign.Solid,
                            //     responsive: true
                            // }),
                            // new sap.m.Image({
                            //     src: "{userModel>src}",
                            //     height: "250px",
                            //     width: "250px"
                            // })
                        ]
                    }).addStyleClass("sapUiSmallMargin")
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
                contentRight: [
                    this.oMenuBtn
                ]
            }),
            content: [
                this.oProfileFBox,
                this.oMainCntFBox
            ],
        });
    },
});