import { apiSlice } from "../../app/api/apiSlice";

export const filterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchTours: builder.query({
            query: ({
                page,
                pageSize,
                destinationId,
                priceFrom,
                priceTo,
                dayFrom,
                dayTo,
                vacationTypeId,
                groupTour,
                groupTourMonth,
                sortByPriceDesc,
                sortByPriceAsc,
                sortByDayDesc,
                sortByDayAsc
            }) => ({
                url: "/tour/",
                method: "GET",
                params: {
                    page,
                    pageSize,
                    destinationId,
                    priceFrom,
                    priceTo,
                    dayFrom,
                    dayTo,
                    vacationTypeId,
                    groupTour,
                    groupTourMonth,
                    sortByPriceDesc,
                    sortByPriceAsc,
                    sortByDayDesc,
                    sortByDayAsc
                },
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "TourComponent" ],
        }),
    }),
});

export const {
    useFetchToursQuery,
} = filterApiSlice;