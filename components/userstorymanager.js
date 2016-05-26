/**
 * Created by Franz on 25.05.2016.
 */

ccm.component({
    name: 'userstorymanager',
    config: {
        html:  [ ccm.store, { local: './json/userstorybuilder.json' } ],
        style: [ ccm.load, './css/tutorial.css' ]
    },
    Instance: function () {
        this.render=function(callback){
            ccm.helper.element(this);
            var element = ccm.helper.element( this );

            element.html('<div class="eingabe">' +
                '<div class="row">' +
                'Headline ' +
                '<input class="headline">' +
                '</div>' +
                '<div class="row">' +
                '<textarea class="description">Describe your Userstory</textarea>' +
                '</div>' +
                '<div class="row">' +
                'Effort ' +
                '<input class="effort">' +
                '</div>' +
                '<div class="row">' +
                'Value ' +
                '<input class="valuee">' +
                '</div>' +
                '<div class="row">' +
                'Priority ' +
                '<input class="priority">' +
                '</div>' +
                '<button class="submitus">Submit Userstory</button>' +
                '<button class="showus">Show all Userstories</button> ' +
                '<div class="userStories"></div>');

            var submitbutton = element.find('button.submitus');
            var showusbutton = element.find('button.showus');
            var headline=element.find('input.headline');
            var description=element.find('textarea.description');
            var valuee=element.find('input.valuee');
            var priority=element.find('input.priority');
            var effort=element.find('input.effort');
            var listus=element.find('div.userStories');

            var n=0;
            var us= [];

            var tuees = element.find('input.headline');
            var wieso = 0;
            submitbutton.click(function(){
                us[n]=Userstory(headline.val(),description.val(),priority.val(),effort.val(),valuee.val(),n);
                console.log(us[0].hl);
                n++;
            });

            function Userstory(hl,des,prio,eff,va,nn){
                this.hl = hl;
                this.des = des;
                this.prio = prio;
                this.eff = eff;
                this.va =va;
                this.ident=nn;
            }

            function testInsert(ins){
                if(true){
                    return 'error';
                }else{
                    return 'success';
                }
            }

            function deleteUS(id) {
                us[id]=null;
                //Userstory mit der ID null setzen
            }

            function getUS(id) {
                // get Userstory by ID
                return us[id]
            }

            function showallUS() {
                for(j=1;j<us.length;j++){
                    //Userstorys drucken
                }
            }

            function changeUS(id) {

            }

            if(callback) callback();
        }
    }
});