sap.ui.jsview("routing.shoppingrouting.productedit", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf routing.shoppingrouting.productedit
     */
    getControllerName: function () {
        return "routing.shoppingrouting.productedit";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf routing.shoppingrouting.productedit
     */
    createContent: function (oController) {
        let oView = this;
        this.oImgUploadPop = new sap.m.Popover({
            showHeader: false,
            placement: sap.m.PlacementType.Bottom,
            content: [
                new sap.ui.unified.FileUploader({
                    icon: "sap-icon://upload",
                    iconOnly: true,
                    change: [oController.oImgChangeEvt, oController],
                    uploadComplete: [oController.oImgUploadEvt, oController]
                })
            ]
        });
        this.oAddPrdtForm = new sap.ui.layout.form.Form({
            visible: true,
            title: "AddProduct",
            width: "100%",
            layout: new sap.ui.layout.form.ResponsiveGridLayout({
                labelSpanL: 6,
                labelSpanM: 6,
                columnsL: 3,
                columnsM: 3
            }),
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            fields: [
                                new sap.m.Image({
                                    height: "180px",
                                    width: "180px",
                                    src: "{userModel>/ProductForm/ImgSrc}",
                                    press: [oController.oUploadImage, oController],
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L12 M12 S2"
                                    })
                                })
                            ]
                        })
                    ],
                    layoutData: new sap.ui.layout.GridData({
                        span: "XL2 L3 M3 S2"
                    })
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "ProductId",
                            fields:
                                new sap.m.Input({
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/ProductId}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "CtgryId",
                            fields:
                                new sap.m.Input({
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/ImgSrc}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        })
                    ],
                    layoutData: new sap.ui.layout.GridData({
                        span: "XL2 L4 M4 S2"
                    })
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "Title",
                            fields:
                                new sap.m.Input({
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/Title}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Price",
                            fields:
                                new sap.m.Input({
                                    description: "INR",
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/Price}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Status",
                            fields:
                                new sap.m.Input({
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/Status}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        })
                    ],
                    layoutData: new sap.ui.layout.GridData({
                        span: "XL2 L5 M5 S2"
                    })
                })
            ]
        }).addStyleClass("textAlignCenter");
        this.oEditPrdtForm = new sap.ui.layout.form.Form({
            visible: false,
            title: "EditProduct",
            width: "100%",
            layout: new sap.ui.layout.form.ResponsiveGridLayout({
                labelSpanL: 6,
                labelSpanM: 6,
                columnsL: 3,
                columnsM: 3
            }),
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            fields: [
                                new sap.m.Image({
                                    height: "180px",
                                    width: "180px",
                                    src: "{userModel>/ProductForm/ImgSrc}",
                                    press: [oController.oUploadImage, oController],
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L12 M12 S2"
                                    })
                                })
                            ]
                        })
                    ],
                    layoutData: new sap.ui.layout.GridData({
                        span: "XL2 L3 M3 S2"
                    })
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "ProductId",
                            fields:
                                new sap.m.Input({
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/ProductId}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "CtgryId",
                            fields:
                                new sap.m.Input({
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/ImgSrc}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        })
                    ],
                    layoutData: new sap.ui.layout.GridData({
                        span: "XL2 L4 M4 S2"
                    })
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "Title",
                            fields:
                                new sap.m.Input({
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/Title}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Price",
                            fields:
                                new sap.m.Input({
                                    description: "INR",
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/Price}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Status",
                            fields:
                                new sap.m.Input({
                                    textAlign: sap.ui.core.TextAlign.Center,
                                    value: "{userModel>/ProductForm/Status}",
                                    layoutData: new sap.ui.layout.GridData({
                                        span: "XL2 L5 M5 S2"
                                    })
                                })
                        })
                    ],
                    layoutData: new sap.ui.layout.GridData({
                        span: "XL2 L5 M5 S2"
                    })
                })
            ]
        }).addStyleClass("textAlignCenter");
        this.oPrdtSpecPanel = new sap.m.Panel({
            // visible: "{= ${userModel>/Visible/MainCnt} === ''}",
            visible: true,
            content: [
                new sap.m.ScrollContainer({
                    height: "300px",
                    vertical: true,
                    content: [
                        new sap.m.Table({
                            mode: sap.m.ListMode.MultiSelect,
                            columns: [
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
                                            text: "SpecValue"
                                        })
                                    ]
                                })
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
                                            })
                                        ]
                                    })
                                }
                            }
                        })
                    ]
                })
            ]
        });
        this.oEditPrdtPanel = new sap.m.Panel({
            content: [
                this.oAddPrdtForm,
                this.oEditPrdtForm
            ]
        });
        this.addDependent(this.oImgUploadPop);
        return new sap.m.Page({
            title: "Title",
            content: [
                this.oEditPrdtPanel,
                this.oPrdtSpecPanel
            ]
        });
    }

});