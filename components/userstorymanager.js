/**
 * Created by Franz on 25.05.2016.
 */

ccm.component({
    name: 'userstorymanager',
    config: {
        style: [ ccm.load, './css/userstorymanager.css' ]
    },
    Instance: function () {
        this.render=function(callback){
            ccm.helper.element(this);
            var element = ccm.helper.element( this );

            element.html('<div class="builder"><div class="row">' +
                '<input class="headline" placeholder="Headline">' +
                '</div>' +
                '<div class="row">' +
                '<textarea class="description" placeholder="Describe your Userstory"></textarea>' +
                '</div>' +
                '<div class="eingabe">' +
                '<div class="row">' +
                '<span class="block">Effort</span>' +
                '<input class="effort" type="range" min="1" max="5">' +
                '<span class="effort_count"></span>' +
                '</div>' +
                '<div class="row">' +
                '<span class="block">Value</span>' +
                '<input class="valuee" type="range" min="1" max="5">' +
                '<span class="value_count"></span>' +
                '</div>' +
                '<div class="row">' +
                '<span class="block">Priority</span>'+
                '<input class="priority" type="range" min="1" max="5">' +
                '<span class="priority_count"></span>' +
                '</div></div>' +
                '<div class="row">' +
                '<button class="submitus">Submit Userstory</button>' +
                '</div>' +
                '<div class="row"> ' +
                '<button class="showus">Show all Userstories</button> ' +
                '</div>' +
                '<div class="row">' +
                '<input class="deleteid" placeholder="Enter ID of the Userstory to delete">' +
                '</div>' +
                '<div class="row"> ' +
                '<button class="deletebutton">Delete Userstory</button>' +
                '</div>' +
                '<div class="row">' +
                '<button class="storeallus">Store Userstories</button> ' +
                '</div> ' +
                '<div class="row">' +
                '<button class="loadallus">Load Userstories from Storage</button>' +
                '</div> ' +
                '<div class="row">' +
                '<button class="clearallus">Clear Storage</button>' +
                '</div> </div> ' +
                '<div class="userStories"></div>');

            // Variablenbelegung
            // Einstellung der Zähler der Input Auswähler (Das neben der Range eine Zahl angezeigt wird)
            var effort_count_value = element.find('span.effort_count');
            var value_count_value = element.find('span.value_count');
            var priority_count_value = element.find('span.priority_count');

            //Einstellung der Variablen für den Delete von Userstories
            var deleteid = element.find('input.deleteid');
            var deletebutton = element.find('button.deletebutton');
            
            //Einstellung der Variablen zum Zeigen der Userstories
            var submitbutton = element.find('button.submitus');
            var showusbutton = element.find('button.showus');
            
            //Einstellen der Variablen zum Input
            var headline=element.find('input.headline');
            var description=element.find('textarea.description');
            var valuee=element.find('input.valuee');
            var priority=element.find('input.priority');
            var effort=element.find('input.effort');
            
            //Einstellen der Variable zum Ausgeben der Userstories
            var listus=element.find('div.userStories');

            //Einstellen von Hilfvariablen
            var userstorieshidden = true;
            var n=0;
            var us= [];

            //Vereinfachung der Auswähler 
            var effort_count_val = effort.val();
            var valuee_count_val = valuee.val();
            var priority_count_val = priority.val();

            //Einstellen der Variablen zum lokalen zwischenspeichern
            var storeall = element.find('button.storeallus');
            var loadall = element.find('button.loadallus');
            var clearall = element.find('button.clearallus');
            
            //Vorbelegung der Auswähler
            effort_count_value.html( effort.val() );
            value_count_value.html( valuee.val() );
            priority_count_value.html( priority.val() );
            
            //Implementierung, dass neben den Auswählern immer die richtige Zahl angezeigt wird
            effort.on( 'input', function() {
                if (effort_count_val !== effort.val()){
                    effort_count_val = effort.val();
                    effort_count_value.html( effort_count_val );
                    show_next_number();
                }
            });
            valuee.on( 'input', function() {
                if (valuee_count_val !== valuee.val()){
                    valuee_count_val = valuee.val();
                    value_count_value.html( valuee_count_val );
                    show_next_number();
                }
            });
            priority.on( 'input', function() {
                if (priority_count_val !== priority.val()){
                    priority_count_val = priority.val();
                    priority_count_value.html( priority_count_val );
                    show_next_number();
                }
            });

            //Submit der Userstory
            submitbutton.click(function(){
                us[n]=new Userstory(headline.val(),description.val(),priority.val(),effort.val(),valuee.val(),n);
                //Konsolenausgabe zu Testzwecken
                //console.log(us[n].hl,us[n].des,us[n].prio,us[n].eff,us[n].va,us[n].ident);
                n++;
                //Konsolenausgabe zu Testzwecken
                //console.log(n);
            });

            //Definition einer Userstory
            function Userstory(hl,des,prio,eff,va,nn){
                this.hl = hl;
                this.des = des;
                this.prio = prio;
                this.eff = eff;
                this.va =va;
                this.ident=nn;
            }

            //Delete einer Userstory
            deletebutton.click(function () {
                us[deleteid.val()]=null;
                //Userstory mit der ID null setzen
            });

            //Ausgabe aller Userstories
            showusbutton.click(function() {
                var printus='';
                if(userstorieshidden){
                    for(j=0;j<us.length;j++){
                        //Userstorys drucken
                        if(us[j]!==null){
                            printus=printus+'<p class="userstory">' +
                                'Header:'+us[j].hl +
                                '</br>Description:'+us[j].des+
                                '</br>Priority:'+us[j].prio +
                                '</br>Effort:'+us[j].eff +
                                '</br>Value:'+us[j].va +
                                '</br>ID:'+us[j].ident +
                                '</p>'
                        }
                        userstorieshidden = false;
                        showusbutton.html('Hide all Userstories');
                    }
                }else {
                    userstorieshidden = true;
                    showusbutton.html('Show all Userstories');
                }
                listus.html(printus);
            });

            //Userstories lokal zwischenspeichern
            storeall.click(function (){
                localStorage.setItem('UserStoryCounter',n);
                for(j=0;j<us.length;j++){
                    localStorage.setItem('US'+j+'hl',us[j].hl);
                    localStorage.setItem('US'+j+'des',us[j].des);
                    localStorage.setItem('US'+j+'eff',us[j].eff);
                    localStorage.setItem('US'+j+'prio',us[j].prio);
                    localStorage.setItem('US'+j+'va',us[j].va);
                    localStorage.setItem('US'+j+'ident',us[j].ident);
                }
            });

            //Userstories aus lokalem Speicher laden
            loadall.click(function () {
                n= localStorage.getItem('UserStoryCounter');
                for(j=0;j<n;j++){
                    us[j]= new Userstory(localStorage.getItem('US'+j+'hl'),
                        localStorage.getItem('US'+j+'des'),
                        localStorage.getItem('US'+j+'prio'),
                        localStorage.getItem('US'+j+'eff'),
                        localStorage.getItem('US'+j+'va'),
                        localStorage.getItem('US'+j+'ident'));
                }
            });
            
            //Lokalen Speicher löschen
            clearall.click(function () {
                localStorage.clear();
            });

            if(callback) callback();
        }
    }
});