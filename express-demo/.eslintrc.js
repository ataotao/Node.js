module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        //关闭no-console规则
        "no-console": "off",
        "linebreak-style": [
            "error",
            "windows"
        ],
        //引号方式
        "quotes": [
            1,
            "single"
        ],
        //语句强制分号结尾
        "semi": [
            1,
            "always"
        ],
        //缩进风格
        'indent': [ 1, 2 ],
        //不能有声明后未被使用的变量或参数
        "no-unused-vars": ["error", {"vars": "all", "args": "none"}],
    }
};
