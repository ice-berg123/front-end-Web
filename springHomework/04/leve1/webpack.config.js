const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { optimize } = require('webpack');
module.exports  ={
    mode:"production",
    context:path.resolve(__dirname),
    entry:{
        index:{
            import:["./src/index/index.js"],
            dependOn:'shared'
        },
        login:{
            import:["./src/login/index.js"],
            dependOn:'shared'
        },
        actor:{
            import:["./src/actor/index.js"],
            dependOn:'shared'
        },
        chart:{
            import:["./src/chart/index.js"],
            dependOn:'shared'
        },
        discuss:{
            import:["./src/discuss/index.js"],
            dependOn:'shared'
        },
        people:{
            import:["./src/people/index.js"],
            dependOn:'shared'
        },
        review:{
            import:["./src/review/index.js"],
            dependOn:'shared'
        },
        search:{
            import:["./src/search/index.js"],
            dependOn:'shared'
        },
        subject:{
            import:["./src/subject/index.js"],
            dependOn:'shared'
        },
        tag:{
            import:["./src/tag/index.js"],
            dependOn:'shared'
        },
        shared:'./src/moudle.js'
    },
    output:{
        filename:"[name].bundle.js",
        path:path.resolve(__dirname,'dist'),
        clean:true,
        assetModuleFilename:'images/[contenthash][ext]'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Douban',
            filename: 'index.html',
            template:'./src/index/index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            title:'Login',
            filename:'login.html',
            template:'./src/login/index.html',
            chunks:['login']
        }),
        new HtmlWebpackPlugin({
            title:'Actor',
            filename:'actor.html',
            template:'./src/actor/index.html',
            chunks:['actor']
        }),
        new HtmlWebpackPlugin({
            title:'Chart',
            filename:'chart.html',
            template:'./src/chart/index.html',
            chunks:['chart']
        }),
        new HtmlWebpackPlugin({
            title:'Discuss',
            filename:'discuss.html',
            template:'./src/discuss/index.html',
            chunks:['discuss']
        }),
        new HtmlWebpackPlugin({
            title:'people',
            filename:'people.html',
            template:'./src/people/index.html',
            chunks:['people']
        }),
        new HtmlWebpackPlugin({
            title:'review',
            filename:'review.html',
            template:'./src/review/index.html',
            chunks:['review']
        }),
        new HtmlWebpackPlugin({
            title:'search',
            filename:'search.html',
            template:'./src/search/index.html',
            chunks:['search']
        }),
        new HtmlWebpackPlugin({
            title:'subject',
            filename:'subject.html',
            template:'./src/subject/index.html',
            chunks:['subject']
        }),
        new HtmlWebpackPlugin({
            title:'tag',
            filename:'tag.html',
            template:'./src/tag/index.html',
            chunks:['tag']
        }),
        new MiniCssExtractPlugin(
            {
                filename:'styles/[contenthash].css'
            }
        )
    ],
    module:{
        rules:[
            {
                test: /\.css$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.(png|jp?g)/i,
                type:'asset',
            },
            {
                test:/\.html$/,
                use:{
                    loader:"html-loader",
                }
            },
        ]
    },
    optimization:{
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}