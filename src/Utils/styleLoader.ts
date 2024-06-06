const classNameResolver = function (styles: () => {default}) {
    return function (cssClassNames: string) {
        const names = cssClassNames
            .split(/(\s+)/)
            .filter((e) => {
                return e.trim().length > 0;
            }).map((cN: string) => {
                return cN[0] !== '|' && styles[cN] ? styles[cN] : cN.replace('|', '');
            });

        return names.join(' ');
    };
};

export const sl = (styles: () => {default}) => classNameResolver(styles().default);