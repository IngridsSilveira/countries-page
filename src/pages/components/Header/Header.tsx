import { ThemeMode } from "../ThemeMode/ThemeMode"

export const Header = () => {
    return (
        <header className="h-14 w-full bg-white dark:bg-slate-950 dark:text-white flex justify-between p-3">
            <h1 className="text-xl font-bold font-baloo">Onde está o país?</h1>
            <ThemeMode/>
        </header>
    )
}