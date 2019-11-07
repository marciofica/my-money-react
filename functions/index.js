const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

exports.contadorMovimentacoes = functions.database.ref('/movimentacoes/{dia}/{mov}').onDelete(async(snapshot, context) => {
    const mesesRef = admin.database().ref('/meses/'+context.params.dia)
    const rootRef = admin.database().ref()
    const urlRef = rootRef.child(`movimentacoes/${context.params.dia}`)
    const messagesData = await urlRef.once('value')
    if(messagesData.numChildren() === 0){
        mesesRef.transaction(current=>{
            return null
        })
    }
    return null
})

exports.soma = functions.database.ref('/movimentacoes/{dia}')
.onWrite(async(change,context) =>{
    const mesesRef = admin.database().ref('/meses/'+context.params.dia)
    const movimentacoesRef = change.after.ref
    const movimentacoesSS = await movimentacoesRef.once('value')
    const movimentacoes = movimentacoesSS.val()

    let entradas = 0
    let saidas = 0

    if(movimentacoes !== null) {
        Object.keys(movimentacoes).forEach(m => {
            if(movimentacoes[m].valor > 0) {
                entradas += movimentacoes[m].valor
            } else {
                saidas += movimentacoes[m].valor
            }
        })
    }
    
    return mesesRef.transaction(current => {
        if(current === null) {
            return {
                entradas,
                saidas,
                previsao_entrada: 0,
                previsao_saida: 0
            }
        } 

        return {
            ...current,
            entradas,
            saidas
        }
    })

})