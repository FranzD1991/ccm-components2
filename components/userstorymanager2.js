
/** ccm.chat.js */
ccm.component( {
    name: 'userstorymanager2',
    config: {                    // Standardkonfiguration für ccm-Instanzen
        html:  [ ccm.store, { local: './json/userstorymanager.json' } ],
        key: 'test',  // Standardwert für den Schlüssel des zu visualisierenden Datensatzes
        store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'userstorymanager' } ],
        //style: [ ccm.load, './css/userstorystyle.css' ],
        user:  [ ccm.instance, 'http://kaul.inf.h-brs.de/ccm/components/user2.js' ]
    },
    Instance: function () {

        var self = this;
        //Initialilsierung
        self.init = function ( callback ) {
            self.store.onChange = function () { self.render(); };
            callback();
        };

        //Zentrale Render Function
        self.render = function ( callback ) {
            var element = ccm.helper.element( self );

            // Laden der bereits vorhandenen Daten
            self.store.get( self.key, function ( dataset ) {

                // Falls keine Daten vorhanden
                if ( dataset === null )

                    self.store.set( { key: self.key, manager: [] }, proceed );
                else
                // Daten vorhanden
                    proceed( dataset );

                // Vorhandene Daten laden
                function proceed( dataset ) {
                    element.html( ccm.helper.html( self.html.get( 'main' ) ) );

                    //Zentrales Gerüst der Seite
                    var userstories_div = ccm.helper.find( self, '.manager' );

                    //Delete Block laden
                    userstories_div.append( ccm.helper.html( self.html.get( 'deleteus' ), {
                        onclick: function () {
                            var id = ccm.helper.val( ccm.helper.find( self, '#us-delete-id' ).val().trim() );
                            if ( id === '' ) return;
                            self.deleteStory(id);
                            return false;
                        }
                    } ) );

                    //Input Bereich laden
                    userstories_div.append( ccm.helper.html( self.html.get( 'input' ), {
                        onchange: function () {
                            var effort = ccm.helper.val( ccm.helper.find( self, '#effort' ).val().trim() );
                            var wert = ccm.helper.val( ccm.helper.find( self, '#wert' ).val().trim() );
                            var priority = ccm.helper.val( ccm.helper.find( self, '#priority' ).val().trim() );

                            var effortaim =element.find("#count_effort");
                            effortaim.html(effort);
                            var wertaim =element.find("#count_wert");
                            wertaim.html(wert);
                            var priorityaim =element.find("#count_priority");
                            priorityaim.html(priority);
                        },
                        onsubmit: function () {
                            var headline = ccm.helper.val( ccm.helper.find( self, '#headline' ).val().trim() );
                            var description = ccm.helper.val( ccm.helper.find( self, '#description' ).val().trim() );
                            var effort = ccm.helper.val( ccm.helper.find( self, '#effort' ).val().trim() );
                            var wert = ccm.helper.val( ccm.helper.find( self, '#wert' ).val().trim() );
                            var priority = ccm.helper.val( ccm.helper.find( self, '#priority' ).val().trim() );

                            if ( headline === '' || description === '') return;
                            self.user.login( function () {
                                var timestamp = Math.floor(((Math.random() + new Date().getUTCMilliseconds()) * new Date().getUTCMilliseconds()));
                                self.store.set( {
                                        key: timestamp,
                                        user: self.user.data().key,
                                        headline: headline,
                                        description: description,
                                        effort: effort,
                                        wert: wert,
                                        priority: priority },
                                    function () {
                                        dataset.manager.push(timestamp);
                                        self.store.set( dataset, function () { self.render(); } );
                                    } );
                            } );
                            return false;
                        }
                    } ) );

                    //Laden der Zusatzfunktionen

                    //Laden der Sortierfunktionen
                    userstories_div.append(ccm.helper.html(self.html.get('sortini')));
                    userstories_div.append(ccm.helper.html(self.html.get('sortwer'),{
                        onclick: function () {
                            console.log("Old order: "+dataset.manager);
                            var xw;
                            var wconverter = [];
                            for(i=0; i<dataset.manager.length;i++){
                                wconverter[i] = self.store.get(dataset.manager[i]);
                            }
                            for(var i=0;i<wconverter.length;i++){
                                for(var j=0;j<wconverter.length;j++){
                                    if(wconverter[j].wert > wconverter[i].wert){
                                        xw = wconverter[i];
                                        wconverter[i]=wconverter[j];
                                        wconverter[j]=xw;
                                    }
                                }
                            }
                            for (var i=0;i<wconverter.length;i++){
                                dataset.manager[i]=wconverter[i].key;
                            }
                            var storyhtml =element.find(".userstory");
                            storyhtml.html("");
                            usloader(dataset.manager);
                            console.log("new order: "+dataset.manager);
                        }
                    }));
                    userstories_div.append(ccm.helper.html(self.html.get('sorteff'),{
                        onclick: function () {
                            console.log("Old order: "+dataset.manager);
                            var xw;
                            var wconverter = [];
                            for(i=0; i<dataset.manager.length;i++){
                                wconverter[i] = self.store.get(dataset.manager[i]);
                            }
                            for(var i=0;i<wconverter.length;i++){
                                for(var j=0;j<wconverter.length;j++){
                                    if(wconverter[j].effort > wconverter[i].effort){
                                        xw = wconverter[i];
                                        wconverter[i]=wconverter[j];
                                        wconverter[j]=xw;
                                    }
                                }
                            }
                            for (var i=0;i<wconverter.length;i++){
                                dataset.manager[i]=wconverter[i].key;
                            }
                            var storyhtml =element.find(".userstory");
                            storyhtml.html("");
                            usloader(dataset.manager);
                            console.log("new order: "+dataset.manager);
                        }
                    }));
                    userstories_div.append(ccm.helper.html(self.html.get('sortprio'),{
                        onclick: function () {
                            console.log("Old order: "+dataset.manager);
                            var xw;
                            var wconverter = [];
                            for(i=0; i<dataset.manager.length;i++){
                                wconverter[i] = self.store.get(dataset.manager[i]);
                            }
                            for(var i=0;i<wconverter.length;i++){
                                for(var j=0;j<wconverter.length;j++){
                                    if(wconverter[j].priority > wconverter[i].priority){
                                        xw = wconverter[i];
                                        wconverter[i]=wconverter[j];
                                        wconverter[j]=xw;
                                    }
                                }
                            }
                            for (var i=0;i<wconverter.length;i++){
                                dataset.manager[i]=wconverter[i].key;
                            }
                            var storyhtml =element.find(".userstory");
                            storyhtml.html("");
                            usloader(dataset.manager);
                            console.log("new order: "+dataset.manager);
                        }
                    }));

                    usloader(dataset.manager);

                    function usloader(decider) {
                        for ( var i = 0; i < decider.length; i++ ) {
                            var userstory = decider[ i ];
                            self.store.get(userstory, function (data) {
                                userstorylistelement = ccm.helper.html( self.html.get( 'userstory' ), {
                                    key:  data.key,
                                    name:  data.user,
                                    headline: data.headline,
                                    description: data.description,
                                    effort: data.effort,
                                    wert: data.wert,
                                    priority: data.priority
                                } );
                                userstories_div.append(userstorylistelement);
                            });
                        }
                    }
                    //Laden der Daten aus der Datenbank
                    if ( callback ) callback();
                }
            } );

            if ( callback ) callback();
        };

        //delete Userstory funktion
        self.deleteStory = function (storyId) {
            self.store.del(storyId, function () {
                self.store.get(self.key, function (data) {
                    for (var i = 0; i < data.manager.length; i++) {
                        if(data.manager[i] == storyId) {
                            data.manager.splice(i, 1);
                            self.store.set(data, function () {
                                console.log('userstory deleted');
                                self.render();
                            });
                            break;
                        }
                    }
                });
            });
        };

    }


} );
