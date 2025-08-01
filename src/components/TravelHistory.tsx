import {PhotoIcon, TrashIcon} from '@heroicons/react/24/solid';
import csvToJson from 'convert-csv-to-json';
import {useTranslations} from 'next-intl';
import {type ChangeEventHandler} from 'react';

export type CsvFile = {
    file: File;
    rows: Record<string, string>[];
};

export type TravelHistoryProps = {
    files: CsvFile[];
    setFiles: (files: CsvFile[]) => void;
};

export const TravelHistory = ({files, setFiles}: TravelHistoryProps) => {
    const t = useTranslations('TravelHistory');

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.files) {
            return;
        }

        void (async () => {
            setFiles([
                ...files,
                ...(await Promise.all(
                    Array.from(event.target.files ?? []).map(async (file) => {
                        const text = await file.text();
                        const rows: CsvFile['rows'] = csvToJson
                            .fieldDelimiter(',')
                            .supportQuotedField(true)
                            .csvStringToJson(text);

                        return {
                            file,
                            rows
                        };
                    })
                ))
            ]);
        })();
    };

    return (
        <form>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <div className="col-span-full">
                    <label className="block leading-6 font-medium text-gray-900" htmlFor="file-upload">
                        {t('title')}
                    </label>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex leading-6 text-gray-600">
                                    <label
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-none hover:text-indigo-500"
                                        htmlFor="file-upload"
                                    >
                                        <span>{t('upload.file')}</span>
                                        <input
                                            id="file-upload"
                                            className="sr-only"
                                            name="file-upload"
                                            type="file"
                                            accept=".csv"
                                            multiple
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <p className="pl-1">{t('upload.dragAndDrop')}</p>
                                </div>
                                <p className="text-sm leading-5 text-gray-600">{t('upload.requirements')}</p>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-center rounded-lg border border-gray-900/25">
                            {/* TODO: https://tailwindui.com/components/application-ui/lists/stacked-lists#component-f0f183415de745e81fa742d6e1df9e04 */}
                            {/* TODO: merge that with div above */}
                            <ul className="divide-y divide-gray-100">
                                {files.map(({file}) => (
                                    <li key={file.name} className="flex items-center justify-between gap-x-6 px-5 py-5">
                                        <div>{file.name}</div>
                                        <div>
                                            <TrashIcon
                                                className="h-4 w-4 cursor-pointer text-gray-300 hover:text-gray-500"
                                                onClick={() => {
                                                    setFiles(files.filter((f) => f.file !== file));
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
