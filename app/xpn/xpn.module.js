(function () {

    "use strict";

    var module = angular.module("xpn", []);

    module.component("xpnHeader", {
        transclude: true,
        controller: function () {
            console.log("xpnHeader");

            var self = this;

            // public properties
            self.menu = [];

            // public methods
            self.addMenu = function (menu) {
                console.log('add menu: ' + menu.id);
                self.menu.push(menu);
            };

            self.addSubMenu = function (id, menu) {
                console.log('add submenu "' + menu.id + '" to "' + id + '"');

                angular.forEach(self.menu, function (item) {
                    if (item.id === id) {
                        if (item.items) {
                            item.items.push(menu);
                        } else {
                            item.items = [menu];
                        }
                    }
                });
            }
        },
        template: "" +
        "<nav class='navbar navbar-default'>" +
        "<div class='container-fluid'>" +
        "   <ul class='nav navbar-nav'>" +
        "       <li class='dropdown' ng-repeat='menu in $ctrl.menu'>" +
        "           <a class='dropdown-toggle' data-toggle='dropdown' href='#'>{{ menu.id }} <span class='caret'></span></a>" +
        "           <ul class='dropdown-menu'>" +
        "               <li ng-repeat='item in menu.items'>" +
        "                   <a href='#'>{{ item.id }}</a>" +
        "               </li>" +
        "           </ul>" +
        "       </li>" +
        "   </ul>" +
        "</div>" +
        "</nav>" +
        "<ng-transclude></ng-transclude>"
    });

    module.component("xpnMenu", {
        require: {
            xpnHeader: "^xpnHeader"
        }
    });

    module.component("xpnMenuHeader", {
        require: {
            xpnHeader: "^xpnHeader"
        },
        bindings: {
            id: "@"
        },
        controller: function () {
            var self = this;
            self.$onInit = function () {
                self.xpnHeader.addMenu({id: self.id});
            }
        }
    });

    module.component("xpnMenuItem", {
        require: {
            xpnHeader: "^xpnHeader",
            menuHeader: "^xpnMenuHeader"
        },
        bindings: {
            id: "@"
        },
        controller: function () {
            var self = this;
            self.$onInit = function () {
                self.xpnHeader.addSubMenu(self.menuHeader.id, {id: self.id})
            }
        }
    });

}());