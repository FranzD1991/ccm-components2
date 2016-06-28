
/** ccm.chat.js */
ccm.component( {
    name: 'userstorymanager2',
    config: {                    // Standardkonfiguration für ccm-Instanzen
        html:  [ ccm.store, { local: './json/userstorymanager.json' } ],
        key: 'test',  // Standardwert für den Schlüssel des zu visualisierenden Datensatzes
        store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'userstorymanager2' } ],
        style: [ ccm.load, './css/userstorystyle.css' ],
        user:  [ ccm.instance, 'http://kaul.inf.h-brs.de/ccm/components/user2.js' ]
    },
    Instance: function () {

        var hilfsarray=[];

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

                    // Kernfunktion--------------------------------------------------------------
                    // Input Bereich laden
                    userstories_div.append( ccm.helper.html( self.html.get( 'input' ), {
                        // Laden der aktuellen zwischenwerte der Slider
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
                        // Bestätigung der zu übermittelnden Werte
                        onsubmit: function () {
                            var headline = ccm.helper.val( ccm.helper.find( self, '#headline' ).val().trim() );
                            var description = ccm.helper.val( ccm.helper.find( self, '#description' ).val().trim() );
                            var effort = ccm.helper.val( ccm.helper.find( self, '#effort' ).val().trim() );
                            var wert = ccm.helper.val( ccm.helper.find( self, '#wert' ).val().trim() );
                            var priority = ccm.helper.val( ccm.helper.find( self, '#priority' ).val().trim() );
                            var timestamp = Math.floor(((Math.random() + new Date().getUTCMilliseconds()) * new Date().getUTCMilliseconds()));

                            saveus(timestamp, headline, description, effort, wert, priority, null);
                            return false;
                        }
                    } ) );

                    // Speicherfunktion der Daten
                    function saveus(timestamp, headline, description, effort, wert, priority, nutzer){
                        if ( headline === '' || description === '') return;
                        self.user.login( function () {
                            if(nutzer===null)nutzer = self.user.data().key;
                            self.store.set( {
                                    key: timestamp,
                                    user: nutzer,
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
                    }
                    //--------------------------------------------------------------

                    //Delete Block laden
                    userstories_div.append( ccm.helper.html( self.html.get( 'deleteus' ), {
                        onclick: function () {
                            var id = ccm.helper.val( ccm.helper.find( self, '#us-delete-id' ).val().trim() );
                            if ( id === '' ) return;
                            deleteStory(id);
                            return false;
                        }
                    } ) );

                    // Kernfunktion--------------------------------------------------------------
                    // Delete Userstory funktion
                    function deleteStory(storyId) {
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
                    }
                    //--------------------------------------------------------------
                    // Laden der Zusatzfunktionen--------------------------------------------------------------
                    // Laden der Clearfunktion
                    userstories_div.append(ccm.helper.html(self.html.get('clearus'),{
                        onclick: function () {
                            deleteallus();
                        }
                    }));
                    // Delete all Userstories
                    function deleteallus() {
                        var heute = new Date();
                        daten = {
                            manager : [],
                            updated_at: heute,
                            key : self.key
                        };
                        self.store.set(daten, function () {
                            console.log('Data cleared');
                            self.render();
                        })
                    }

                    // Laden der Sortierfunktionen.........................................
                    // Sort by Value
                    userstories_div.append(ccm.helper.html(self.html.get('sortini')));

                    // Sort by Effort
                    userstories_div.append(ccm.helper.html(self.html.get('sorteff'),{
                        onclick: function () {
                            console.log("Old order: "+dataset.manager);
                            var xw;
                            var wconverter = [];
                            for(i=0; i<dataset.manager.length;i++){
                                wconverter[i] = self.store.get(dataset.manager[i]);
                            }
                            for(var iw=0;iw<wconverter.length;iw++){
                                for(var j=0;j<wconverter.length;j++){
                                    if(parseInt(wconverter[j].effort) > parseInt(wconverter[iw].effort)){
                                        xw = wconverter[iw];
                                        wconverter[iw]=wconverter[j];
                                        wconverter[j]=xw;
                                    }
                                }
                            }
                            dataset.manager=[];
                            deleteallus();
                            console.log("New Order:");
                            for (var i=0;i<wconverter.length;i++){
                                console.log(wconverter[i].key);
                                saveus(wconverter[i].key,
                                    wconverter[i].headline,
                                    wconverter[i].description,
                                    wconverter[i].effort,
                                    wconverter[i].wert,
                                    wconverter[i].priority,
                                    wconverter[i].user);
                            }
                        }
                    }));

                    userstories_div.append(ccm.helper.html(self.html.get('sortwer'),{
                        onclick: function () {
                            console.log("Old order: "+dataset.manager);
                            var xw;
                            var wconverter = [];
                            for(i=0; i<dataset.manager.length;i++){
                                wconverter[i] = self.store.get(dataset.manager[i]);
                            }
                            for(var iw=0;iw<wconverter.length;iw++){
                                for(var j=0;j<wconverter.length;j++){
                                    if(parseInt(wconverter[j].wert) > parseInt(wconverter[iw].wert)){
                                        xw = wconverter[iw];
                                        wconverter[iw]=wconverter[j];
                                        wconverter[j]=xw;
                                    }
                                }
                            }
                            dataset.manager=[];
                            deleteallus();
                            console.log("New Order:");
                            for (var i=0;i<wconverter.length;i++){
                                console.log(wconverter[i].key);
                                saveus(wconverter[i].key,
                                    wconverter[i].headline,
                                    wconverter[i].description,
                                    wconverter[i].effort,
                                    wconverter[i].wert,
                                    wconverter[i].priority,
                                    wconverter[i].user);
                            }
                        }
                    }));

                    // Sort by Priority
                    userstories_div.append(ccm.helper.html(self.html.get('sortprio'),{
                        onclick: function () {
                            console.log("Old order: "+dataset.manager);
                            var xw;
                            var wconverter = [];
                            for(i=0; i<dataset.manager.length;i++){
                                wconverter[i] = self.store.get(dataset.manager[i]);
                            }
                            for(var iw=0;iw<wconverter.length;iw++){
                                for(var j=0;j<wconverter.length;j++){
                                    if(parseInt(wconverter[j].priority) > parseInt(wconverter[iw].priority)){
                                        xw = wconverter[iw];
                                        wconverter[iw]=wconverter[j];
                                        wconverter[j]=xw;
                                    }
                                }
                            }
                            dataset.manager=[];
                            deleteallus();
                            console.log("New Order:");
                            for (var i=0;i<wconverter.length;i++){
                                console.log(wconverter[i].key);
                                saveus(wconverter[i].key,
                                    wconverter[i].headline,
                                    wconverter[i].description,
                                    wconverter[i].effort,
                                    wconverter[i].wert,
                                    wconverter[i].priority,
                                    wconverter[i].user);
                            }
                        }
                    }));
                    //.........................................
                    //--------------------------------------------------------------

                    // Kernfunktion--------------------------------------------------------------
                    // Laden der Daten aus der Datenbank
                    usloader(dataset.manager);
                    // Funktion zum Laden der Daten
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
                    //--------------------------------------------------------------
                    
                    if ( callback ) callback();
                }
            } );

            if ( callback ) callback();
        };


    }


} );
