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
        this.oProCntBackBtn = new sap.m.Button({
            text: "Back",
            type: sap.m.ButtonType.Back,
            press: [oController.oProCntBackEvt, oController]
        });
        this.oProfileList = new sap.m.List({
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
        this.oProHeader = new sap.m.ObjectHeader({
            title: "{userModel>title}",
            backgroundDesign: sap.m.BackgroundDesign.Solid,
            responsive: true,
            number: {
                path: "userModel>price",
                formatter: (sValue) => {
                    let val = oView.oNFormat.format(sValue, oView.oNFormat.oLocaleData.getCurrencySymbol("INR"));
                    return val;
                }
            },
            intro: "{userModel>description}",
            attributes: [
                new sap.m.ObjectAttribute({
                    title: "Model",
                    text: "{userModel>model}"
                }),
                new sap.m.ObjectAttribute({
                    title: "Manufacturer",
                    text: "{userModel>owner}"
                })
            ],
            headerContainer: new sap.m.HeaderContainer({
                orientation: sap.ui.core.Orientation.Vertical,
                content: [
                    new sap.m.Image({
                        src: "{userModel>src}",
                    })
                ]
            })
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
                    this.oProCntBackBtn
                ],
                contentRight: [
                    this.oMenuBtn
                ]
            }),
            content: [
                this.oProfileFBox,
                this.oProHeader
            ]
        });
	}

});