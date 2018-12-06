sap.ui.jsview("routing.shoppingrouting.mainContent", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf shoppingrouting.mainContent
	*/ 
	getControllerName : function() {

		return "routing.shoppingrouting.mainContent";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf shoppingrouting.mainContent
	*/ 
	createContent : function(oController) {
        let oView = this;
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
        this.cartBtn = new sap.m.Button({
            icon: "sap-icon://cart",
            press: [oController.crtBtnEvt, oController]
        });
        this.mainCntFBox = new sap.m.FlexBox({
            justifyContent: sap.m.FlexJustifyContent.Center,
            alignItems: sap.m.FlexAlignItems.Center,
            fitContainer: true,
            items: {
                path: "userModel>/img/category",
                factory: (sIdx, oContext) => {
                    return new sap.m.GenericTile({
                        header: "{userModel>id}",
                        backgroundImage: "shoppingrouting/images/tile.jpg",
                        tileContent: new sap.m.TileContent({
                            content: [
                                new sap.m.ImageContent({
                                    src: "{userModel>loc}"
                                })
                            ]
                        }),
                        press: [oController.mainTileEvt, oController]
                        // press: (oEvnt) => {
                        //     var oBinding = oEvnt.getSource().getBinding("header").getContext();
                        //     this.subCntFBox.bindElement(`userModel>${oBinding.getPath()}`);
                        // }
                    }).addStyleClass("sapUiSmallMarginEnd");
                }

            }
        });
        return new sap.m.Page({
            customHeader: new sap.m.Bar({
                contentMiddle: [new sap.m.Label({
                    text: "My App"
                })],
                contentRight: [
                    this.cartBtn
                ]
            }),
            subHeader: new sap.m.Bar({
                contentRight: [
                    this.menuBtn
                ]
            }),
            content: [
                this.profileFBox,
                this.mainCntFBox
            ],
        });
	},
});