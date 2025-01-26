export const config = {
    port: process.env.PORT || 3000,
    supportedPostCount: 15,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://techweb:dNhO0lOvE79jys2h@cluster0.ooees.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    JwtSecret: '5e560a0619e99a00b25e43658a9b1f92ee6095c2cc0b4480b22f84db1dd22d67'
};