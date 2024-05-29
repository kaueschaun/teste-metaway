import { defineStore } from 'pinia';

export const useStoreAction= defineStore('action', {
   state: () => ({
        action: false, 
   }),
    actions: {
        setAction(action) {
            this.action = action; 
        },
        onConfirm(actions) {
            if(actions.type === 'isCreate') {
                this.setAction(actions)
            }
            if(actions.type  === 'isEdit') {
                this.setAction(actions)
            }
        }
    }
});