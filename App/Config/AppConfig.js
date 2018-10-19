export default {
    appVersion: '1.3.3',
    allowTextFontScaling: true,
    graphql:{
        parseQueries: true
    },
    urls: {

        dev: {
            // host: '10.201.235.188',
//      host: 'localhost',
            host: '10.201.236.21',
            hakan: 'http://10.201.232.108:3000',
            url: 'http://10.201.236.21:3000'
        },
        prod: {
            host: 'https://api.medway-assistance.com',
            url: 'https://api.medway-assistance.com'
        },
        store: {
            android: 'https://play.google.com/store/apps/details?id=com.medway.Medway',
            ios: 'https://itunes.apple.com/fr/app/medway/id1245263046'
        }
    },
    devConfig: {
        loginEmail: 'alfred@medway.care',
        loginPassword: 'alfred',
        code: 'DAMIAN'
    },
    devMode: {
        home: {
            report: false
        },
        launch: {
            maj: false
        }
    },
    oneSignal: {
        app_id: '4ca285f8-6d6c-4fcc-87b9-642205664d03'
    }
}
