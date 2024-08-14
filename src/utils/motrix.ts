import {useSystemConfigStore} from '@/store';
import {useMessage} from '@/hooks/useMessage';
import type { ParsedFile } from '@/types';

export function sendToMotrix(results: ParsedFile[]) {
	const system = useSystemConfigStore();
	const message = useMessage();

	try {
		const params = new URLSearchParams({
			uris: results.map(f => f.link).join('\n'),
			"userAgent": system.parse_ua,
		});
		window.open(`motrix://new-task?${params.toString()}`, '_self');
	} catch (error) {
		message.error('推送到 Motrix 客户端出错！');
	}
}