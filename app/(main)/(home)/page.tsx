import MainMenu from "@/components/MainMenu"
import StatusBar from "@/components/StatusBar"

const HomePage = () => {
    return (
        <div className="flex flex-col gap-32 pt-5 sm:pt-15 pl-0 sm:pl-20 items-center max-md:gap-10 md:flex-row animate-fade-in">
            <StatusBar/>
            <MainMenu/>
        </div>
    )
}

export default HomePage