
import Breadcrumbs from '@/components/Breadcrumbs'
import Profileindex from '@/components/profile'
import { use } from 'react'
import { ProfileForm2 } from '@/components/profile/ProfileForm2'
import { ProfileForm1 } from '@/components/profile/ProfileForm1'


export default function Profile({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    const dir = locale === "ar" ? "rtl" : "ltr"
    const crumbs = [{ title: locale === "ar" ? "حسابي" : "Profile" }]

    return (
        <div className="pt-20 lg:pt-35 mt-10 " dir={dir}>
            <Breadcrumbs crumbs={crumbs} />
            <Profileindex />
            <div className='flex flex-col md:flex-row lg:px-50 container p-8 gap-10 md:items-center'>

                <ProfileForm1 />
                <ProfileForm2 />
            </div>
        </div>
    )
}
