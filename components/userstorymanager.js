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

            element.html('<div class="row">' +
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
                '<button class="showus">Show all Userstories</button> ' +
                '</div>' +
                '<div class="row">' +
                '<input class="deleteid">' +
                '<button class="deletebutton">Delete Userstory</button>' +
                '</div>' +
                '<div class="userStories"></div>');

            var effort_count_value = element.find('span.effort_count');
            var value_count_value = element.find('span.value_count');
            var priority_count_value = element.find('span.priority_count');

            var deleteid = element.find('input.deleteid');
            var deletebutton = element.find('button.deletebutton');

            var submitbutton = element.find('button.submitus');
            var showusbutton = element.find('button.showus');
            var headline=element.find('input.headline');
            var description=element.find('textarea.description');
            var valuee=element.find('input.valuee');
            var priority=element.find('input.priority');
            var effort=element.find('input.effort');
            var listus=element.find('div.userStories');

            var userstorieshidden = true;
            var n=0;
            var us= [];

            effort_count_value.html( effort.val() );
            value_count_value.html( valuee.val() );
            priority_count_value.html( priority.val() );

            var effort_count_val = effort.val();
            var valuee_count_val = valuee.val();
            var priority_count_val = priority.val();

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

            submitbutton.click(function(){
                us[n]=new Userstory(headline.val(),description.val(),priority.val(),effort.val(),valuee.val(),n);
                console.log(us[n].hl,us[n].des,us[n].prio,us[n].eff,us[n].va,us[n].ident);
                n++;
                console.log(n);
            });

            function Userstory(hl,des,prio,eff,va,nn){
                this.hl = hl;
                this.des = des;
                this.prio = prio;
                this.eff = eff;
                this.va =va;
                this.ident=nn;
            }

            deletebutton.click(function () {
                us[deleteid.val()]=null;
                //Userstory mit der ID null setzen
            });

            function getUS(id) {
                // get Userstory by ID
                return us[id]
            }

            showusbutton.click(function() {
                var printus='';
                if(userstorieshidden){
                    for(j=1;j<us.length;j++){
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

            function changeUS(id) {

            }

            if(callback) callback();
        }
    }
});