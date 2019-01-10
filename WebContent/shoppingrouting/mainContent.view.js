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
        this.oSlide = new sap.m.Carousel({
            visible: "{= ${userModel>/Visible/MainCnt} === 'X'}",
            height: "40%",
            width: "100%",
            showPageIndicator: false,
            pages: {
                path: "userModel>/Carousel",
                factory: (sIdx, oContext) => {
                    return new sap.m.Image({
                        height: "300px",
                        width: "100%",
                        src: "{userModel>ImgSrc}"
                    })
                }
            }
        });
        this.oCtgryList = new sap.m.FlexBox({
            visible: "{= ${userModel>/loggedin/Role} === 'ADMIN' || ${userModel>/Visible/CtgryList} === 'X'}",
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
                            icon: "sap-icon://add",
                            visible: "{= ${userModel>/loggedin/Role} === 'ADMIN'}",
                            press: [oController.oAddCtgryBtn, oController]
                        })
                        // new sap.m.Button({
                        //     icon: "sap-icon://decline",
                        //     visible: "{= ${userModel>/loggedin/Role} === 'ADMIN' && ${userModel>/Visible/CtgryEditBtn} === 'X'}",
                        //     press: [oController.oCloseEdit, oController]
                        // })
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
                                    visible: "{= ${userModel>/loggedin/Role} === 'ADMIN'}",
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
        this.oMainCntPanel = new sap.m.Panel({
           content: [
               new sap.m.Text({
                  text: "Recent Items"
               }).addStyleClass("sapUiSmallMargin"),
               new sap.ui.layout.Grid({
                   visible: "{= ${userModel>/Visible/MainCnt} === 'X'}",
                   defaultSpan: "{userModel>/MainCnt/DefaultSpan}",
                   hSpacing: 1,
                   content: {
                       path: "userModel>/category",
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
               })
           ]
        }).addStyleClass("background1");
        this.oBarAdmin = new sap.m.Bar({
            design: sap.m.BarDesign.Header,
            contentRight: [
                new sap.m.Button({
                    icon: "sap-icon://save",
                    type: sap.m.ButtonType.Emphasized,
                })
            ]
        });
        this.oBarAdmin1 = new sap.m.Bar({
            design: sap.m.BarDesign.Header,
            contentRight: [
                new sap.m.Button({
                    icon: "sap-icon://save",
                    type: sap.m.ButtonType.Emphasized,
                })
            ]
        });
        this.oAddCtgryPanel = new sap.m.Panel({
            visible: "{= ${userModel>/Visible/MainCnt} === '' && ${userModel>/Visible/AddCtgryPanel} === 'X'}",
            content: [
                this.oBarAdmin,
                new sap.ui.layout.form.Form({
                    visible: true,
                    width: "100%",
                    title: "AddCategory",
                    layout: new sap.ui.layout.form.ResponsiveGridLayout({
                        labelSpanL: 4,
                        labelSpanM: 4
                    }),
                    formContainers: [
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: "CategoryId",
                                    fields:
                                        new sap.m.Input({
                                            textAlign: sap.ui.core.TextAlign.Center,
                                            value: "{userModel>/CategoryForm/CtgryId}",
                                            layoutData: new sap.ui.layout.GridData({
                                                span: "XL2 L4 M4 S2"
                                            })
                                        })
                                }),
                                new sap.ui.layout.form.FormElement({
                                    label: "Title",
                                    fields:
                                        new sap.m.Input({
                                            textAlign: sap.ui.core.TextAlign.Center,
                                            value: "{userModel>/CategoryForm/Title}",
                                            layoutData: new sap.ui.layout.GridData({
                                                span: "XL2 L4 M4 S2"
                                            })
                                        })
                                })
                            ],
                            layoutData: new sap.ui.layout.GridData({
                                span: "XL12 L6 M6 S12"
                            })
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: "Status",
                                    fields:
                                        new sap.m.Input({
                                            textAlign: sap.ui.core.TextAlign.Center,
                                            value: "{userModel>/CategoryForm/Status}",
                                            layoutData: new sap.ui.layout.GridData({
                                                span: "XL2 L4 M4 S2"
                                            })
                                        })
                                })
                            ],
                            layoutData: new sap.ui.layout.GridData({
                                span: "XL12 L6 M6 S12"
                            })
                        })
                    ]
                })
            ]
        });
        this.oEditCtgryPanel = new sap.m.Panel({
            visible: "{= ${userModel>/Visible/MainCnt} === '' && ${userModel>/Visible/AddCtgryPanel} === ''}",
            content: [
                this.oBarAdmin1,
                new sap.ui.layout.form.Form({
                    visible: true,
                    width: "100%",
                    title: "EditCategory",
                    layout: new sap.ui.layout.form.ResponsiveGridLayout({
                        labelSpanL: 4,
                        labelSpanM: 4
                    }),
                    formContainers: [
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: "CategoryId",
                                    fields:
                                        new sap.m.Input({
                                            textAlign: sap.ui.core.TextAlign.Center,
                                            value: "{userModel>CtgryId}",
                                            layoutData: new sap.ui.layout.GridData({
                                                span: "XL2 L4 M4 S2"
                                            })
                                        })
                                }),
                                new sap.ui.layout.form.FormElement({
                                    label: "Title",
                                    fields:
                                        new sap.m.Input({
                                            textAlign: sap.ui.core.TextAlign.Center,
                                            value: "{userModel>Title}",
                                            layoutData: new sap.ui.layout.GridData({
                                                span: "XL2 L4 M4 S2"
                                            })
                                        })
                                })
                            ],
                            layoutData: new sap.ui.layout.GridData({
                                span: "XL12 L6 M6 S12"
                            })
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: "Status",
                                    fields:
                                        new sap.m.Input({
                                            textAlign: sap.ui.core.TextAlign.Center,
                                            value: "{userModel>Status}",
                                            layoutData: new sap.ui.layout.GridData({
                                                span: "XL2 L4 M4 S2"
                                            })
                                        })
                                })
                            ],
                            layoutData: new sap.ui.layout.GridData({
                                span: "XL12 L6 M6 S12"
                            })
                        })
                    ]
                })

            ]
        });
        this.oCtgrySpecPanel = new sap.m.Panel({
            visible: "{= ${userModel>/Visible/MainCnt} === ''}",
            content: [
                new sap.m.Table({
                    mode: sap.m.ListMode.MultiSelect,
                    columns: [
                        new sap.m.Column({
                            header: [
                                new sap.m.Text({
                                    text: "SpecId"
                                })
                            ]
                        }),
                        new sap.m.Column({
                            header: [
                                new sap.m.Text({
                                    text: "SpecName"
                                })
                            ]
                        }),
                        new sap.m.Column({
                            header: [
                                new sap.m.Text({
                                    text: "InputType"
                                })
                            ]
                        }),
                        new sap.m.Column({
                            header: [
                                new sap.m.Text({
                                    text: ""
                                })
                            ]
                        }),
                    ],
                    items: {
                        path: "userModel>/SpecificationsTable",
                        factory: ()=> {
                            return new sap.m.ColumnListItem({
                                cells: [
                                    new sap.m.Input({
                                        value: "{userModel>SpecId}"
                                    }),
                                    new sap.m.Input({
                                        value: "{userModel>SpecValue}"
                                    }),
                                    new sap.m.Input({
                                        value: "{userModel>InputType}"
                                    }),
                                    new sap.m.Button({
                                        text: "Click",
                                        press: [oController.oAddSpecSuggBtn, oController]
                                    }),
                                ]
                            })
                        }
                    }
                })
            ]
        });
        this.oSpecSuggTable = new sap.ui.table.Table({
            visible: true,
            visibleRowCount: 3,
            selectionMode: sap.ui.table.SelectionMode.MultiToggle,
            rows: "{userModel>/SpecSuggTable}",
            columns: [
                new sap.ui.table.Column({
                    label: new sap.m.Label({
                        text: "{userModel>/SpecSuggTabCols/0/value}"
                    }),
                    template: new sap.m.Input({
                        value: "{userModel>SpecSuggId}"
                    })
                }),
                new sap.ui.table.Column({
                    label: new sap.m.Label({
                        text: "{userModel>/SpecSuggTabCols/1/value}"
                    }),
                    template: new sap.m.Input({
                        value: "{userModel>SpecSugg}"
                    })
                })
            ]
        });
        this.oSpecSuggDialog = new sap.m.Dialog({
            title: "SpecificationSuggestions",
            buttons: [
                new sap.m.Button({
                    icon: "sap-icon://save",
                    type: sap.m.ButtonType.Emphasized
                })
            ],
            content: [
                this.oSpecSuggTable
            ]
        });
        this.oCtgryFBox = new sap.m.FlexBox({
            items: [
                this.oCtgryList,
                new sap.m.FlexBox({
                    height: "100%",
                    width: "100%",
                    direction: sap.m.FlexDirection.Column,
                    items: [
                        this.oSlide,
                        this.oMainCntPanel,
                        this.oAddCtgryPanel,
                        this.oEditCtgryPanel,
                        this.oCtgrySpecPanel,
                        this.oSpecSuggDialog
                    ]
                })
            ]
        });
        return new sap.m.Page({
            customHeader: new sap.m.Bar({
                contentLeft: [
                    new sap.m.ToggleButton({
                        visible: "{= ${userModel>/loggedin/Role} !== 'ADMIN'}",
                        pressed: true,
                        icon: "sap-icon://list",
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
            content: [
                this.oCtgryFBox
            ]
        });
    },
})
;