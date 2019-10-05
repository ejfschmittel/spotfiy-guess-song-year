import React, {lazy, Suspense} from 'react'

import SearchInput from "../components/search-input.component"

const FeaturedPlaylists = lazy(() => import("../components/featured-playlists-overview.component"))
const UserPlaylists = lazy(() => import("../components/user-playlists-overview.component"))
const CategoryOverview = lazy(() => import("../components/category-overview.component"))

const OverviewPage = () => (
    <div>
        <SearchInput />
        <FeaturedPlaylists />
        <UserPlaylists />
        <CategoryOverview />             
    </div>
)

export default OverviewPage