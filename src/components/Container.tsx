export function Container({
    children,
    classNames = ""
}:{
    children: React.ReactNode,
    classNames?: string
}) {

    return (
        <div className={`max-w-xl m-auto bg-slate-200 ${classNames}`}>
            {children}
        </div>
    )
}