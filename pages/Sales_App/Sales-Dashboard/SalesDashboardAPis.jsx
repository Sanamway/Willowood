import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setDelaerCountData } from "@/utils/dealerCountSlice";

// Define async thunk
export const fetchDealerCount = createAsyncThunk(
    "dealer/fetchDealerCount",
    async (params, { dispatch }) => {
        const { yr, month, bgId, buId, zId, rId, tId } = params;

        let endPoint;
        // You can optimize the endpoint assignment here if necessary
        if (bgId && buId && zId && rId && tId) {
            endPoint = "api/get_dealer_count";
        } else if (bgId && buId && zId && rId && !tId) {
            endPoint = "api/get_dealer_count";
        } else {
            return; // Or handle as necessary
        }

        try {
            // Call API
            const response = await axios.get(`${url}/${endPoint}`, {
                headers: headers,
                params: {
                    t_year: yr || null,
                    m_year: month === "All" || !month ? null : moment(month).format("YYYY-MM"),
                    bg_id: bgId === "All" || !bgId ? null : bgId,
                    bu_id: buId === "All" || !buId ? null : buId,
                    z_id: zId === "All" || !zId ? null : zId,
                    r_id: rId === "All" || !rId ? null : rId,
                    t_id: tId === "All" || !tId ? null : tId,
                },
            });

            return response.data.data; // Return the response to be saved in Redux
        } catch (error) {
            throw Error("Error fetching dealer count data");
        }
    }
);