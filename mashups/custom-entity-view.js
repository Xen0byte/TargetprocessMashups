tau.mashups
    .addDependency('jQuery')
    .addDependency('tp/general/view')
    .addDependency('tp3/mashups/topmenu')
    .addDependency('tp3/mashups/popup')
    .addMashup(function ($, view, topmenu, popup) {
        var menuItem = topmenu.addItem({ title: 'Coming Soon™', icon: 'global-settings' });
        var option = menuItem.addItem('Customize View');

        view.onRender(function () {
            var entityIdentifier = "div.view-header__icon em.tau-entity-icon.tau-entity-icon-full";

            option.onClick(function () {
                var entityType = $(entityIdentifier).is(":visible") ? document.querySelector(entityIdentifier).textContent : "NONE";

                if (entityType === "Bug") {
                    popupInstance = new popup('<div id="popup-content" style="overflow: auto; position: absolute; height: 800px; width: 80%; top: calc((100% - 800px) / 2); left: 10%;">' +
                        '<h2 align="center"><span style="color: #00A591;">Customization Options</span></h2>' + '</div>');

                    var content = $("div#popup-content");
                    var containers = [].slice.call(document.querySelectorAll("div.tau-container.ui-collapsible"));

                    popupInstance.show();

                    containers.forEach(function (container) {
                        console.log(container);
                    });

                    for (i = 0; i < containers.length; i++) {
                        console.log("container #" + i + ": " + containers[i].innerHTML);

                        var newItem = '<li id="' + 'newitem_' + i + '" style="overflow: auto; box-sizing: border-box; height: calc(45% - 12px); width: calc(25% - 12px);' +
                            'float: left; margin: 3px; padding: 5px; border: 3px solid #00A591;"><span>' + containers[i].innerHTML + '</span></li>';

                        $(content).append(parseElement(newItem, "newitem_" + i));
                    }
                }

                else {
                    popup = new popup('<div style="position: absolute; height: 150px; width: 100%; top: calc((100% - 150px) / 2);">' +
                        '<h1 align="center" style="color: #E94B3C;">This entity is currently not supported.</h1>' +
                        '<h1 align="center" style="color: #E94B3C;">The currently supported entities are: <span style="color: #00A591;">Bugs</span></h1>' +
                        '</div>');

                    popup.show();
                }
            });
        });

        // THIS IS WHERE THE MAGIC HAPPENS
        function parseElement(element, id) {
            $(document.body).append(element);

            var parsedElement = $(element).each(function () {
                console.log($(this));
            });

            $("#" + id).remove();

            return parsedElement;
        }
    });

// Dependencies Explained Here: https://dev.targetprocess.com/v1.0/docs/dependencies