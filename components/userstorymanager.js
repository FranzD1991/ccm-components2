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
            element.html( ' <form><input>test 2</input>' +
                '<textarea id="description">Describe your Userstory</textarea></form>' +
                '<p id="doit1">Hello, World!</p>' );
            if(getElementID('description')){
                element.html('erfolg');
            }
            var n=0;
            var us= [];
            function Userstory(hl,des,prio,eff,va){
                this.hl = hl;
                this.des = des;
                this.prio = prio;
                this.eff = eff;
                this.va =va;
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
            
            function submitUS() {
                if(testInsert('getInhalt des Formulars')==='error'||'get Inhalt des Formulars'==='error'){
                    alert('Bitte alle Felder ausfüllen !');
                }else{
                    us[n]=userstory(header,description,effort,priority,valuee,n);
                    n++;
                }
            }

            if(callback) callback();
        }
    }
});