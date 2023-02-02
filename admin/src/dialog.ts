// This file is part of HFS - Copyright 2021-2023, Massimo Melina <a@rejetto.com> - License https://www.gnu.org/licenses/gpl-3.0.txt

import {
    Box,
    Button,
    CircularProgress,
    Dialog as MuiDialog,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton
} from '@mui/material'
import {
    createElement as h, Fragment,
    isValidElement,
    ReactElement,
    useEffect,
    useRef,
    useState
} from 'react'
import { Check, Close, Error as ErrorIcon, Forward, Info, Warning } from '@mui/icons-material'
import { newDialog, closeDialog, dialogsDefaults, DialogOptions } from '@hfs/shared'
import { Form, FormProps } from '@hfs/mui-grid-form'
import { IconBtn } from './misc'
import { Flex } from '@hfs/frontend/src/components'
import { useDark } from './theme'
import { useWindowSize } from 'usehooks-ts'
export * from '@hfs/shared/dialogs'

dialogsDefaults.Container = function Container(d:DialogOptions) {
    const ref = useRef<HTMLElement>()
    const { width, height } = useWindowSize()
    const mobile = Math.min(width, height) < 500
    useEffect(()=> {
        const h = setTimeout(() => {
            const el = ref.current
            if (!el) return
            el.focus()
            if (mobile) return
            const input = el.querySelector('[autofocus]') || el.querySelector('input,textarea')
            if (input && input instanceof HTMLElement)
                input.focus()
        })
        return () => clearTimeout(h)
    }, [ref.current])
    d = { ...dialogsDefaults, ...d }
    const { sx, root, ...rest } = d.dialogProps||{}
    dialogsDefaults.dialogProps = { fullScreen: mobile, sx: { overflow:'initial' } }
    return h(MuiDialog, {
        open: true,
        maxWidth: 'lg',
        fullScreen: mobile,
        ...rest,
        ...root,
        onClose: ()=> closeDialog(),
    },
        d.title && h(DialogTitle, {
            sx: {
                position: 'sticky', top: 0, py: 1, pr: 1, zIndex: 2, boxShadow: '0 0 8px #0004',
                display: 'flex', alignItems: 'center',
                ...useDialogBarColors()
            }
        },
            h(Box, { flex:1, minWidth: 40 }, d.title),
            h(IconBtn, { icon: Close, tooltip: "close", onClick: () => closeDialog() }),
        ),
        h(DialogContent, {
            ref,
            sx: {
                p: d.padding ? 2 : 0, pt: '16px !important', overflow: 'initial',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                ...sx,
            }
        }, h(d.Content) )
    )
}

export function useDialogBarColors() {
    return useDark() ? { bgcolor: '#2d2d2d' } : { bgcolor:'#aaa', color: '#444', }
}

type AlertType = 'error' | 'warning' | 'info' | 'success'

const type2ico = {
    error: ErrorIcon,
    warning: Warning,
    info: Info,
    success: Check,
}
export async function alertDialog(msg: ReactElement | string | Error, options?: AlertType | ({ type?:AlertType, icon?: ReactElement } & Partial<DialogOptions>)) {
    return new Promise(resolve => {
        const opt = typeof options === 'string' ? { type: options } : (options ?? {})
        let { type='info', ...rest } = opt
        if (msg instanceof Error) {
            msg = msg.message || String(msg)
            type = 'error'
        }
        const close = newDialog({
            className: 'dialog-alert-' + type,
            icon: '!',
            onClose: resolve,
            ...rest,
            Content() {
                return h(Box, { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 },
                    h(IconButton, {
                        onClick() {
                            close()
                        },
                        size: 'small',
                        sx: { position: 'absolute', right: 0, top: 0, opacity: .5 }
                    }, h(Close)),
                    opt.icon ?? h(type2ico[type], { color: type, fontSize: 'large' }),
                    isValidElement(msg) ? msg
                        : h(Box, { fontSize: 'large', mb: 1, lineHeight: '1.8em' }, String(msg)),
                )
            }
        })
    })
}

interface ConfirmOptions { href?: string }
export async function confirmDialog(msg: string | ReactElement, { href }: ConfirmOptions={}) : Promise<boolean> {
    return new Promise(resolve => newDialog({
        className: 'dialog-confirm',
        icon: '?',
        onClose: resolve,
        Content
    }) )

    function Content() {
        return h(Fragment, {},
            h(Box, { mb: 2 }, msg),
            h(Flex, {},
                h('a', {
                    href,
                    onClick: () => closeDialog(true),
                }, h(Button, { variant: 'contained' }, "Confirm")),
                h(Button, { onClick: () => closeDialog(false) }, "Don't"),
            ),
        )
    }
}

type FormDialog<T> = Pick<DialogProps, 'fullScreen' | 'title'>
    & Pick<DialogOptions, 'dialogProps'>
    & Omit<FormProps<T>, 'values' | 'save' | 'set'>
    & Partial<Pick<FormProps<T>, 'values' | 'save'>>
    & {
    onChange?: (values:Partial<T>, extra: { setValues: React.Dispatch<React.SetStateAction<Partial<T>>> }) => void,
    before?: any
}
export async function formDialog<T>({ fullScreen, title, onChange, before, ...props }: FormDialog<T>) : Promise<T> {
    return new Promise(resolve => newDialog({
        className: 'dialog-confirm',
        icon: '?',
        onClose: resolve,
        title,
        Content
    }) )

    function Content() {
        const [values, setValues] = useState<Partial<T>>(props.values||{})
        return h(Fragment, {},
            before,
            h(Form, {
                ...props,
                values,
                set(v, k) {
                    const newV = { ...values, [k]: v }
                    setValues(newV)
                    onChange?.(newV, { setValues })
                },
                save: {
                    ...props.save,
                    onClick() {
                        closeDialog(values)
                    }
                }
            })
        )
    }
}

export async function promptDialog(msg: string, props:any={}) : Promise<string | undefined> {
    return formDialog<{ text: string }>({
        ...props,
        fields: [
            { k: 'text', label: null, autoFocus: true,
                before: h(Box, { mb: 2 }, msg),
                ...props.field
            },
        ],
        save: {
            children: "Continue",
            startIcon: h(Forward),
            ...props.save,
        },
        saveOnEnter: true,
        barSx: { gap: 2 },
        addToBar: [
            h(Button, { onClick: closeDialog }, "Cancel"),
            ...props.addToBar||[],
        ]
    }).then(values => values?.text)
}

export function waitDialog() {
    return newDialog({ Content: CircularProgress, closable: false })
}

export function toast(msg: string | ReactElement, type: AlertType | ReactElement='info') {
    const ms = 3000
    const close = newDialog({
        Content,
        dialogProps: {
            PaperProps: {
                sx: { transition: `opacity ${ms}ms ease-in` },
                ref(x: HTMLElement) { // we need to set opacity later, to trigger transition
                    if (x)
                        x.style.opacity = '0'
                }
            }
        }
    })
    setTimeout(close, ms)

    function Content(){
        return h(Box, { display:'flex', flexDirection: 'column', alignItems: 'center', gap: 1 },
            isValidElement(type) ? type : h(type2ico[type], { color:type }),
            isValidElement(msg) ? msg : h('div', {}, String(msg))
        )
    }
}
