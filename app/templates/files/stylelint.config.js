'use strict';

// 手动取stylelint-config-standard的rules
const standardRules = require('stylelint-config-standard');

// 删除no-missing-end-of-source-newline规则，pcss文件末尾不加空行
delete standardRules.rules['no-missing-end-of-source-newline'];

// 自定义规则
const customRules = {
    'rules': {
        'at-rule-empty-line-before': ['always', {
            except: [
                'inside-block',
                'blockless-after-same-name-blockless',
                'first-nested',
            ],
            ignore: ['after-comment'],
        }],
        'block-opening-brace-space-before': 'always',
        'declaration-block-semicolon-newline-after': 'always',
        'declaration-colon-space-after': 'always',
        'declaration-empty-line-before': 'never',
        'indentation': 4,
        'rule-empty-line-before': ['always',{
            except: [
                'after-single-line-comment',
                'inside-block-and-after-rule',
                'first-nested'
            ],
            ignore: [
                'after-comment',
                'inside-block'
            ],
        }],
        'selector-list-comma-newline-after': 'always-multi-line',
        'selector-pseudo-element-colon-notation': 'single',
        'number-leading-zero': 'never',
        'max-empty-lines': 2
    }
};

// 自定义规则合并到stylelint-config-standard，并且输出
module.exports = Object.assign({}, standardRules, customRules);